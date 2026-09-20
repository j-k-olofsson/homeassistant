"""Regression tests for short, state-safe pre-generated goodnight greetings."""
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location(
    "goodnight_text", Path(__file__).parents[1] / "custom_components/granny_goodnight/text.py")
text = importlib.util.module_from_spec(spec)
spec.loader.exec_module(text)


class GreetingTests(unittest.TestCase):
    def test_all_state_combinations(self):
        from itertools import product
        for states in product(("off", "on", "unknown", "unavailable", None),
                              ("closed", "open", "closing", "unknown", None),
                              ("locked", "unlocked", "locking", "unknown", None)):
            mapping = dict(zip((c[0] for c in text.CHECKS), states))
            message, safe = text.checks_message(mapping.get)
            self.assertEqual(safe, states == ("off", "closed", "locked"))
            if safe:
                self.assertEqual(message, "Godnatt och sov sött!")
            else:
                self.assertNotIn("Godnatt", message)
                for check, state in zip(text.CHECKS, states):
                    if state != check[1]:
                        self.assertIn(check[3] if state in check[2] else check[4], message)

if __name__ == "__main__":
    unittest.main()
