#!/bin/bash
declare -a bkp=(
wcoss.run.hysplit_bluesky_p4s1.sh \
wcoss.run.hysplit_bluesky_p4.sh \
wcoss.run.hysplit_bluesky_xyz.sh \
wcoss.run.hysplit_hms.sh \
wcoss.run.hysplit_nco.sh \
wcoss.run.hysplit_emc.sh \
wcoss.run.cmaq_pm25_column.sh \
wcoss.run.my_cmaq_pm25.sh \
wcoss.run.my_cmaq_o3.sh \
wcoss.run.global_aod.sh \
)
declare -a site=(
wcoss2.run.cmaq_pm25.sh \
wcoss2.run.cmaq_o3.sh \
wcoss2.run.rrfs_cmaq_o3.sh \
wcoss2.run.rrfs_cmaq_pm25.sh \
)

for i in "${site[@]}"; do
   bash ${i}
done
exit
