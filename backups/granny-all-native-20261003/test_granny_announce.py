"""The HA entrypoint must never fan out a multiroom announcement."""
from pathlib import Path
import unittest
import yaml

CONFIG=yaml.safe_load((Path(__file__).parents[1]/'scripts.yaml').read_text())
class AnnouncementTests(unittest.TestCase):
    def test_multroom_is_one_sync_service(self):
        script=CONFIG['granny_announce']
        self.assertEqual(script['mode'],'queued')
        branch=next(step for step in CONFIG['granny_speak_attempt']['sequence'] if step.get('if') == "{{ player == 'media_player.grannys_hogtalare' }}")
        self.assertEqual(len(branch['then']),1)
        self.assertEqual(branch['then'][0]['action'],'granny_sync.speak')
        self.assertEqual(branch['then'][0]['data']['entity_id'],'media_player.grannys_hogtalare')
        self.assertNotIn('announcement_targets',str(script))
    def test_broadcast_response_is_dictionary(self):
        sequence=CONFIG['granny_broadcast']['sequence']
        response=sequence[-1]['response_variable']
        self.assertIsInstance(sequence[-2]['variables'][response],dict)
if __name__=='__main__':unittest.main()
