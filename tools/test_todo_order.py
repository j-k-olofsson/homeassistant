"""Run inside the HA container: python /config/tools/test_todo_order.py."""

import asyncio
from datetime import date, datetime
from pathlib import Path
import sys
import unittest
from uuid import uuid1
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from custom_components.todo_order import ListOrder, sort_key
from homeassistant.components.todo import TodoItem
from homeassistant.util import dt as dt_util


class FakeHass:
    async_create_task = staticmethod(asyncio.create_task)


class FakeEntity:
    def __init__(self, items):
        self.todo_items = items
        self.moves = []
        self.order = None
        self.on_move = None

    async def async_move_todo_item(self, uid, previous_uid=None):
        self.moves.append((uid, previous_uid))
        item = next(x for x in self.todo_items if x.uid == uid)
        self.todo_items.remove(item)
        index = next((i + 1 for i, x in enumerate(self.todo_items) if x.uid == previous_uid), 0)
        self.todo_items.insert(index, item)
        if self.on_move:
            operation, self.on_move = self.on_move, None
            operation()
        self.order.changed(self.todo_items)


class OrderingTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        dt_util.set_default_time_zone(ZoneInfo("Europe/Stockholm"))

    async def run_order(self, items):
        order = ListOrder(FakeHass(), "todo.inkopslogg")
        entity = FakeEntity(items)
        order.entity = entity
        entity.order = order
        order.changed()
        await asyncio.wait_for(order.task, 5)
        return order, entity

    async def test_dates_undated_and_same_day_creation(self):
        old = TodoItem(uid=str(uuid1()), due=date(2026, 11, 1))
        recent = TodoItem(uid=str(uuid1()), due=date(2026, 11, 8))
        same_day_newer = TodoItem(uid=str(uuid1()), due=date(2026, 11, 8))
        undated = TodoItem(uid=str(uuid1()))
        order, entity = await self.run_order([old, recent, undated, same_day_newer])
        self.assertEqual(entity.todo_items, [undated, same_day_newer, recent, old])
        moves = len(entity.moves)
        order.changed()
        await order.task
        self.assertEqual(len(entity.moves), moves)

    async def test_edit_date_without_count_change(self):
        a = TodoItem(uid=str(uuid1()), due=date(2026, 10, 1))
        b = TodoItem(uid=str(uuid1()), due=date(2026, 11, 1))
        order, entity = await self.run_order([b, a])
        a.due = date(2026, 12, 1)
        order.changed()
        await order.task
        self.assertEqual(entity.todo_items, [a, b])
        # A newly appended undated entry moves to the top.
        c = TodoItem(uid=str(uuid1()))
        entity.todo_items.append(c)
        order.changed()
        await order.task
        self.assertEqual(entity.todo_items, [c, a, b])

    async def test_simultaneous_deletion_during_sort(self):
        items = [TodoItem(uid=str(uuid1()), due=date(2026, month, 1)) for month in (1, 2, 3)]
        order = ListOrder(FakeHass(), "todo.inkopslogg")
        entity = FakeEntity(items.copy())
        order.entity = entity
        entity.order = order
        entity.on_move = lambda: entity.todo_items.remove(items[1])
        order.changed()
        await order.task
        self.assertEqual(entity.todo_items, [items[2], items[0]])

    async def test_mixed_dates_datetimes_and_non_uuid_ids(self):
        items = [TodoItem(uid="a", due=date(2026, 11, 8)),
                 TodoItem(uid="b", due=datetime(2026, 11, 8, 14, tzinfo=ZoneInfo("UTC"))),
                 TodoItem(uid="c")]
        self.assertEqual([i.uid for i in sorted(items, key=sort_key, reverse=True)], ["c", "b", "a"])


if __name__ == "__main__":
    unittest.main()
