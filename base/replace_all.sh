#!/bin/sh
#
ls > tlist
count=0
while read line
do
  shfile[$count]=$(echo $line | awk '{print $1}')
  ((count++))
done<tlist

old_ver='local_src=/lfs/h2/emc/physics/noscrub/${USER}/WEB'
new_ver='local_src=/lfs/h2/emc/vpppg/save/${USER}/WEB'
for i in "${shfile[@]}"
do
   echo ${i}
   if [ "${i}" == $0 ]; then continue; fi
   if [ "${i}" == "xtest1" ]; then continue; fi
   if [ -d ${i} ]; then continue; fi
   ## mv ${i}.bak ${i}
   if [ -e xtest1 ]; then /bin/rm -f xtest1; fi
   grep "${old_ver}" ${i} > xtest1
   if [ -s xtest1 ]; then
      mv ${i} ${i}.bak
      sed -e "s!${old_ver}!${new_ver}!" ${i}.bak > ${i}
      ## echo "diff ${i} ${i}.bak"
      chmod u+x ${i}
      diff ${i} ${i}.bak
   fi
done
exit
