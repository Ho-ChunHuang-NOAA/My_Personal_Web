#!/bin/bash
declare -a bkp=(
wcoss.run.global_aod.sh \
)
declare -a site=(
wcoss2.run.rrfs_cmaq_o3.sh \
wcoss2.run.rrfs_cmaq_pm25.sh \
wcoss2.run.verif_cmaq_o3.sh \
wcoss2.run.verif_cmaq_pm25.sh \
wcoss2.run.eval_cmaq_o3.sh \
wcoss2.run.eval_cmaq_pm25.sh 
)

for i in "${site[@]}"; do
   bash ${i}
done
exit
