"""Granny must send one native Chromecast stream for a multiroom utterance."""
from pathlib import Path
import unittest
import yaml

CONFIG = yaml.safe_load((Path(__file__).parents[1] / 'scripts.yaml').read_text())

class AnnouncementTests(unittest.TestCase):
    def test_group_has_one_destination_and_no_per_room_dispatch(self):
        script = CONFIG['granny_announce']
        self.assertEqual(script['mode'], 'queued')
        self.assertNotIn('for_each', str(script))
        calls = [step for step in script['sequence'] if step.get('action') == 'script.granny_tal_till_ett_chromecast_mal']
        self.assertEqual(len(calls), 1)
        self.assertIn('player', calls[0]['data']['media_player'])
        self.assertNotIn('granny_sync.speak', str(CONFIG['granny_speak_attempt']))

    def test_missing_native_group_reports_error_instead_of_fanning_out(self):
        route = CONFIG['granny_announce']['sequence']
        branch = route[1]['then']
        self.assertEqual(branch[0]['action'], 'persistent_notification.create')
        self.assertTrue(branch[-1]['error'])
        self.assertIn('active_queue', route[0]['variables']['native_group_candidates'])
        self.assertIn('regex_match', route[0]['variables']['native_group_candidates'])

    def test_retry_keeps_same_destination(self):
        script = CONFIG['granny_announce_player']
        self.assertEqual(script['sequence'][1]['repeat']['count'], 2)
        attempts = script['sequence'][1]['repeat']['sequence']
        call = next(step for step in attempts if step.get('action') == 'script.granny_ett_talforsok')
        self.assertEqual(call['data']['player'], '{{ player }}')

    def test_broadcast_response_is_dictionary(self):
        sequence = CONFIG['granny_broadcast']['sequence']
        response = sequence[-1]['response_variable']
        self.assertIsInstance(sequence[-2]['variables'][response], dict)

if __name__ == '__main__':
    unittest.main()
