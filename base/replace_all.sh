#!/bin/sh
#
ls > tlist
count=0
while read line
do
  shfile[$count]=$(echo $line | awk '{print $1}')
  ((count++))
done<tlist

old_ver='\/gpfs\/hps3\/emc\/naqfc\/noscrub\/Ho-Chun.Huang'
old_ver='\/gpfs\/hps3\/emc\/naqfc\/noscrub\/${USER}'
old_ver='\/gpfs\/hps3\/emc\/meso\/noscrub\/${USER}'
new_ver='\/lfs\/h2\/emc/\physics\/noscrub\/${USER}'
old_ver='"\/gpfs\/hps\/nco\/ops\/com\/aqm\/prod"'
new_ver='"\/lfs\/h1\/ops\/prod\/com\/aqm\/"+aqm_ver'
old_ver='"\/gpfs\/hps\/nco\/ops\/com\/aqm\/prod\/"'
new_ver='"\/lfs\/h1\/ops\/prod\/com\/aqm\/"+aqm_ver+"\/"'
old_ver='metout="/lfs/h1/ops/prod/com/aqm/"+aqm_ver+"/"'
new_ver='metout="/lfs/h1/ops/prod/com/aqm/"+aqm_ver'
old_ver='\/gpfs\/hps\/ptmp\/Ho-Chun.Huang'
new_ver='\/lfs\/h2\/emc\/ptmp\/${USER}'
old_ver='"/gpfs/hps/nco/ops/com/aqm/"+envir'
new_ver='"/lfs/h1/ops/"+envir+"/com/aqm/"+aqm_ver+"/"'
old_ver='"/gpfs/hps/nco/ops/com/aqm/",'
new_ver='"/lfs/h1/ops/prod/com/aqm/"+aqm_ver+"/",'
old_ver='data_dir="/gpfs/hps3/emc/meso/noscrub/"'
new_ver='data_dir="/lfs/h2/emc/physics/noscrub/"'
old_ver='ptmp_dir="/gpfs/dell1/ptmp/"+user'
new_ver='ptmp_dir="/lfs/h2/emc/ptmp/"+user'
old_ver='stmp_dir="/gpfs/dell2/stmp/"+user'
new_ver='stmp_dir="/lfs/h2/emc/stmp/"+user'
old_ver='"/gpfs/dell2/ptmp/"+user'
new_ver='"/lfs/h2/emc/ptmp/"+user'
old_ver='/gpfs/dell2/emc/modeling/noscrub/${USER}'
new_ver='/lfs/h2/emc/physics/noscrub/${USER}'
old_ver='\/gpfs\/hps3\/emc\/meso\/noscrub\/Ho-Chun.Huang'
new_ver='\/lfs\/h2\/emc/\physics\/noscrub\/${USER}'
old_ver='/gpfs/dell2/emc/modeling/save'
new_ver='/lfs/h2/emc/physics/save'
old_ver='/gpfs/dell2/emc/verification/noscrub'
new_ver='/lfs/h2/emc/physics/noscrub'
old_ver='/gpfs/dell2/ptmp/Ho-Chun.Huang'
new_ver='/lfs/h2/emc/ptmp/${USER}'
old_ver='/gpfs/dell2/stmp/Ho-Chun.Huang'
new_ver='/lfs/h2/emc/stmp/${USER}'
old_ver='/gpfs/dell2/emc/verification'
new_ver='/lfs/h2/emc/physics'
old_ver='/gpfs/dell4/nco/ops/com/gefs/prod'
new_ver='/lfs/h1/ops/prod/com/gefs/v12.2'
old_ver='/gpfs/dell1/nco/ops/com/gfs/prod'
new_ver='/lfs/h1/ops/prod/com/gfs/v16.2'
old_ver='Ho-Chun.Huang'
new_ver='${USER}'
old_ver='Jianping.Huang'
new_ver='jianping.huang'
old_ver='/bin/sh'
new_ver='/bin/bash'
old_ver='module load ips/18.0.5.274'
new_ver='#'
old_ver='module load HPSS/5.0.2.5'
new_ver='#'
old_ver='module load prod_envir\/1.1.0'
new_ver='module load prod_envir'
old_ver='module load prod_util\/1.1.6'
new_ver='module load prod_util'
old_ver='/gpfs/dell2/emc/modeling/noscrub/${USER}'
new_ver='/lfs/h2/emc/physics/noscrub/${USER}'
old_ver='/5year/NCEPDEV/emc-naqfc/${USER}'
new_ver='/5year/NCEPDEV/emc-naqfc/Ho-Chun.Huang'
old_ver='/gpfs/dell1/nco/ops/dcom/prod'
old_ver='${DCOMROOT}'
new_ver='/lfs/h1/ops/prod/dcom'
old_ver='/bin/sh'
new_ver='/bin/bash'
old_ver='/gpfs/dell2/emc/modeling/save/${USER}/WEB'
new_ver='/lfs/h2/emc/physics/noscrub/${USER}/WEB/base'
old_ver='/gpfs/dell2/ptmp'
old_ver='/gpfs/dell1/ptmp'
old_ver='/gpfs/dell3/ptmp'
new_ver='/lfs/h2/emc/ptmp'
old_ver='/gpfs/dell2/stmp'
old_ver='/gpfs/dell1/stmp'
old_ver='/gpfs/dell3/stmp'
new_ver='/lfs/h2/emc/stmp'
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
