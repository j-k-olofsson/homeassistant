"""Offline regression checks for group-only playback and bounded failure recovery."""

import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "controller", Path(__file__).parents[1] / "custom_components/granny_sync/controller.py"
)
controller = importlib.util.module_from_spec(spec)
spec.loader.exec_module(controller)


class SyncTests(unittest.IsolatedAsyncioTestCase):
    async def exercise(self, fail=None, offline=False):
        members = ["a", "b"]
        calls = []
        prepared = []
        spoken = []
        players = {
            p: {"player_id": p, "name": p.upper(), "available": True,
                "output_protocols": [{"output_protocol_id": p, "available": True}]}
            for p in members
        }
        if offline:
            players["a"]["available"] = False
        if fail == "swallowed":
            players["a"].update(_cast_state="idle", _cast_app_name="Default Media Receiver")
            players["a"]["output_protocols"].append({
                "output_protocol_id": "bridge", "available": True,
                "protocol_domain": "sendspin", "derived_from": "a"})

        async def command(name, **kw):
            calls.append((name, kw))
            if name == "config/players/get":
                return {"provider": "sync_group", "values": {
                    "dynamic_members": {"value": True},
                    "group_members": {"value": ["a", "b"]}}}
            if name == "players/all":
                return [*players.values(), {"player_id": "group", "group_members": list(members)}]
            if name == "players/cmd/set_members":
                for p in kw.get("player_ids_to_remove", []):
                    members.remove(p)
                for p in kw.get("player_ids_to_add", []):
                    if p not in members:
                        members.append(p)

        async def prepare():
            prepared.append(list(members))
            if fail == "readiness" and "a" in members:
                raise RuntimeError("Cast app on A (Cast) did not report ready within 30 seconds.")
            if fail == "unknown":
                raise RuntimeError("TTS engine failed")

        async def speak():
            spoken.append(list(members))

        result = await controller.broadcast(command, "group", prepare, speak)
        self.assertTrue(all(kw.get("player_id", "group") == "group" for _, kw in calls))
        self.assertTrue(all(kw.get("target_player", "group") == "group" for _, kw in calls))
        self.assertFalse(any(name == "config/players/save" for name, _ in calls))
        return result, prepared, spoken

    async def test_member_failure_retries_group_before_speech(self):
        result, prepared, spoken = await self.exercise(fail="readiness")
        self.assertEqual(prepared, [["a", "b"], ["b"]])
        self.assertEqual(spoken, [["b"]])
        self.assertEqual(result["excluded"], ["a"])

    async def test_unavailable_skipped(self):
        _, prepared, spoken = await self.exercise(offline=True)
        self.assertEqual(prepared, [["b"]])
        self.assertEqual(spoken, [["b"]])

    async def test_swallowed_follower_error_is_detected_before_speech(self):
        result, prepared, spoken = await self.exercise(fail="swallowed")
        self.assertEqual(prepared, [["a", "b"], ["b"]])
        self.assertEqual(spoken, [["b"]])
        self.assertEqual(result["excluded"], ["a"])

    async def test_next_announcement_reconsiders_all_members(self):
        await self.exercise(fail="readiness")
        _, _, spoken = await self.exercise()
        self.assertEqual(spoken, [["a", "b"]])

    async def test_unknown_failure_does_not_evict_arbitrary_member(self):
        with self.assertRaisesRegex(RuntimeError, "TTS engine failed"):
            await self.exercise(fail="unknown")

    def test_virtual_bridge_does_not_mask_offline_cast(self):
        self.assertFalse(controller.eligible({"available": True, "output_protocols": [
            {"output_protocol_id": "cast", "available": False},
            {"output_protocol_id": "sendspin", "available": True, "derived_from": "cast"},
        ]}))

    def test_ha_cast_unavailable_overrides_stale_ma_availability(self):
        self.assertFalse(controller.eligible({"available": True, "_cast_state": "unavailable",
            "output_protocols": [{"output_protocol_id": "cast", "available": True}]}))


if __name__ == "__main__":
    unittest.main()
