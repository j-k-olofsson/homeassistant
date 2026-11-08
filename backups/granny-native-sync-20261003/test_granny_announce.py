"""Regression checks for Granny's native Chromecast routing."""
from pathlib import Path
import unittest
import yaml

CONFIG = yaml.safe_load((Path(__file__).parents[1] / 'scripts.yaml').read_text())

class AnnouncementTests(unittest.TestCase):
    def test_no_granny_speech_routes_to_sendspin_sync_service(self):
        for name in ['granny_broadcast', 'granny_announce', 'granny_announce_player', 'granny_speak_attempt']:
            self.assertNotIn('granny_sync.speak', str(CONFIG[name]))
        self.assertEqual(CONFIG['granny_announce']['mode'], 'queued')
        route = CONFIG['granny_announce']['sequence'][-1]['repeat']
        self.assertEqual(route['for_each'], '{{ announcement_targets }}')
        self.assertTrue(route['sequence'][0]['continue_on_error'])
        self.assertEqual(route['sequence'][0]['action'], 'script.granny_announce_player')

    def test_each_speaker_has_its_own_retry_and_error_notification(self):
        script = CONFIG['granny_announce_player']
        self.assertEqual(script['sequence'][1]['repeat']['count'], 2)
        self.assertIn('player', script['sequence'][0]['variables']['notification_id'])
        calls = [s for s in CONFIG['granny_speak_attempt']['sequence'] if s.get('action') == 'tts.speak']
        self.assertEqual(len(calls), 1)
        self.assertEqual(calls[0]['data']['media_player_entity_id'], '{{ player }}')

    def test_broadcast_response_is_dictionary(self):
        sequence = CONFIG['granny_broadcast']['sequence']
        response = sequence[-1]['response_variable']
        self.assertIsInstance(sequence[-2]['variables'][response], dict)

if __name__ == '__main__':
    unittest.main()
