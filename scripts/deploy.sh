docker rmi markdown-best
docker build -t markdown-best .
docker save markdown-best > image.tar

scp image.tar root@193.112.127.195:~
ssh root@193.112.127.195 "/root/deploy_scripts/deploy_markdown-best.sh"

rm -f image.tar
