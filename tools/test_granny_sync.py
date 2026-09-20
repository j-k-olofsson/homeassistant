"""One synchronized utterance, and exception-safe native MA queue restoration."""
import copy
import importlib.util
import unittest
from pathlib import Path

spec=importlib.util.spec_from_file_location('controller',Path(__file__).parents[1]/'custom_components/granny_sync/controller.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)

class SyncTests(unittest.IsolatedAsyncioTestCase):
    async def run_case(self, states=None, sources=None, failure=False, changed=False, inspect_only=False, unavailable=False, read_failure=False):
        states=states or {'a':'playing','b':'paused','group':'idle'}
        sources=sources or {'a':'a','b':'b'}
        calls=[];spoke=[];reads=0
        queues={q:{'queue_id':q,'state':s,'current_item':{'queue_item_id':q+'-item'}} for q,s in states.items()}
        async def command(name,**kw):
            nonlocal reads
            calls.append((name,kw))
            if name=='config/players/get':return {'provider':'sync_group','values':{'group_members':{'value':['a','b']}}}
            if name=='players/all':return [{'player_id':p,'available':not unavailable,'active_source':sources[p]} for p in sources]
            if name=='player_queues/all':
                reads+=1
                if read_failure and reads>1:raise RuntimeError('read failed')
                return copy.deepcopy(list(queues.values()))
            if name=='player_queues/pause':queues[kw['queue_id']]['state']='paused'
            if name=='player_queues/resume':queues[kw['queue_id']]['state']='playing'
        async def speak():
            spoke.append('group')
            self.assertTrue(all(q['state']!='playing' for qid,q in queues.items() if qid!='group'))
            if changed:queues['a']['current_item']['queue_item_id']='user-selected-item'
            if failure:raise RuntimeError('announcement failed')
        try:
            result=await c.broadcast(command,'group',speak,inspect_only=inspect_only)
            return result,calls,spoke,queues
        except RuntimeError:
            self.failure_calls=calls;self.failure_queues=queues
            raise

    async def test_only_previously_playing_independent_queue_resumes(self):
        result,calls,spoke,queues=await self.run_case()
        self.assertEqual(spoke,['group']);self.assertEqual(result['restored_queues'],['a'])
        self.assertEqual(queues['b']['state'],'paused')
        names=[name for name,_ in calls]
        self.assertLess(names.index('players/cmd/power'), names.index('player_queues/resume'))
        self.assertFalse(any('set_members' in name or 'play_media' in name for name,_ in calls))

    async def test_group_music_is_restored_by_native_announcement(self):
        result,calls,spoke,_=await self.run_case(states={'group':'playing'},sources={'a':'group','b':'group'})
        self.assertEqual(result['resume_queues'],[]);self.assertEqual(spoke,['group'])
        self.assertFalse(any(name in ['player_queues/pause','player_queues/resume'] for name,_ in calls))

    async def test_two_independent_queues_resume(self):
        result,_,spoke,_=await self.run_case(states={'a':'playing','b':'playing'})
        self.assertEqual(result['restored_queues'],['a','b']);self.assertEqual(spoke,['group'])

    async def test_shared_external_queue_is_paused_and_resumed_once(self):
        result,calls,_,_=await self.run_case(states={'other':'playing'},sources={'a':'other','b':'other'})
        self.assertEqual(result['restored_queues'],['other'])
        self.assertEqual(sum(name=='player_queues/pause' for name,_ in calls),1)

    async def test_speech_failure_still_resumes_music(self):
        with self.assertRaisesRegex(RuntimeError,'announcement failed'):await self.run_case(failure=True)
        self.assertEqual(self.failure_queues['a']['state'],'playing')

    async def test_changed_queue_is_not_overwritten(self):
        result,_,_,_=await self.run_case(changed=True)
        self.assertEqual(result['restored_queues'],[])

    async def test_inspection_is_read_only_and_silent(self):
        _,calls,spoke,queues=await self.run_case(inspect_only=True)
        self.assertEqual(spoke,[]);self.assertEqual(queues['a']['state'],'playing')
        self.assertFalse(any(name.endswith(('/pause','/resume')) for name,_ in calls))

    async def test_no_available_speakers_fails_without_fallback(self):
        with self.assertRaisesRegex(RuntimeError,'No available'):await self.run_case(unavailable=True)
        self.assertFalse(any(name.endswith(('/pause','/resume')) for name,_ in self.failure_calls))

    async def test_read_failure_does_not_strand_paused_music(self):
        result,_,_,_=await self.run_case(read_failure=True)
        self.assertEqual(result['restored_queues'],['a'])

if __name__=='__main__':unittest.main()
