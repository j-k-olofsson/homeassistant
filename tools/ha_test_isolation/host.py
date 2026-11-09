import subprocess,sys
IMAGE='sha256:c0f062fa323'
def host(script):
 p=subprocess.run(['ssh','-i','/config/ssh/id_diego_monitor','-oBatchMode=yes','diego@192.168.10.200','docker run --rm -i --pull=never --network host --pid host --privileged --entrypoint nsenter '+IMAGE+' -t 1 -m -u -n -i -p -- /bin/bash -s'],input=script,text=True,capture_output=True)
 print(p.stdout,end=''); print(p.stderr,end='',file=sys.stderr)
 if p.returncode: raise SystemExit(p.returncode)
if __name__=='__main__': host(sys.stdin.read())
