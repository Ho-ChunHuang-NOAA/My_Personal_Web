#!/bin/sh
set -x
## This script will be called from /data/data003/hhuang/code/edraot_viirs_gridded/plot_edraot_daily_avg.pro
## Will be using the same day as input
## machine=`hostname | cut -d'.' -f1`
## echo $machine
hl=`hostname | cut -c1-1`
if [[ $# -lt 1 ]]; then
   TODAY=`date +%Y%m%d`
else
   TODAY=$1
fi
if [[ $# -lt 2 ]]; then
   exp=${exp}
   exp2=${exp}_bc
   exp=${exp}
   exp2=${exp2}a
else
   exp=$2
   if [[ $# -lt 3 ]]; then
      exp2=${exp}_bc
   else
      exp2=$3
   fi
fi
exp=prod
exp2=para6d
#
FIRST_AVAIL_DAY=20191001
FIRST_AVAIL_DAY=20200801
FIRST_AVAIL_DAY=20190701
FstY0=`echo ${FIRST_AVAIL_DAY} | cut -c1-4`
X0=`echo ${FIRST_AVAIL_DAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   FstMx=`echo ${FIRST_AVAIL_DAY} | cut -c6-6`
else
   FstMx=`echo ${FIRST_AVAIL_DAY} | cut -c5-6`
fi
FstD0=`echo ${FIRST_AVAIL_DAY} | cut -c7-8`
#
## Local  Source Directory
local_src=/gpfs/dell2/emc/modeling/save/${USER}/WEB
local_base=${local_src}/base
local_html=${local_src}/html
local_js=${local_src}/js
local_inc=${local_src}/includes
##################################################
## creating new html and js file in working_dir ##
##################################################
working_dir=/gpfs/dell3/ptmp/${USER}/WEB
mkdir -p ${working_dir}
cd ${working_dir}
/bin/rm -rf *
##################################################

## Remote Login Information
remote_machine=emcrzdm.ncep.noaa.gov
remote_user=hchuang
## Remote Target Directory
remote_src=/home/people/emc/www/htdocs/mmb/hchuang/web
remote_http=http://www.emc.ncep.noaa.gov/mmb/hchuang/web
remote_html=${remote_src}/html
remote_js=${remote_src}/js
remote_inc=${remote_src}/includes

remote_fig=${remote_src}/fig
WebFig=${remote_http}/fig

declare -a str=( Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec )
Y0=`echo ${TODAY} | cut -c1-4`
X0=`echo ${TODAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   Mx=`echo ${TODAY} | cut -c6-6`
else
   Mx=`echo ${TODAY} | cut -c5-6`
fi
D0=`echo ${TODAY} | cut -c7-8`
#
# If starting figure is not existed due to any reason,e.g., server down,  do not update the time info of the html and js
#
## Can not check remote file. Keep foe local usage
#
## if [[ -e ${remote_fig}/${Y0}/${TODAY}/hysplitconussmokepbl_03.png ]]; then

   chrstr=${str[${Mx}-1]}   ## keyword for Month

   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!CMAQPMIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp}.${TODAY}.t06z.1hpm25-max.day1.k1.png!"  -e "s!CMAQPMIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}.${TODAY}.t06z.1hpm25-max.day1.k1.png!"  -e "s!CMAQPMIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}-${exp}.${TODAY}.t06z.1hpm25-max.day1.k1.png!" -e "s!FIREIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/fireemisfire.conus.${exp2}.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIREIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/gbbepxfire.conus.${exp}.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIREIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hmsfire.conus.${exp}.${TODAY}.t06z.location.day1.k1.png!" -e "s!DUSTIMAGE1!${WebFig}/${Y0}/${TODAY}/rrfs13.fireemis.conus.${TODAY}.location.png!" -e "s!DUSTIMAGE2!${WebFig}/${Y0}/${TODAY}/rrfs25.fireemis.conus.${TODAY}.location.png!" ${local_base}/rrfs_cmaq_pm25_max.base > ${working_dir}/rrfs_cmaq_pm25_max.html

##    sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!CMAQPMIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp}.${TODAY}.t06z.21.pm25_tot.k1.png!" -e "s!CMAQPMIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}.${TODAY}.t06z.21.pm25_tot.k1.png!" -e "s!HIGHAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.high.png!"  -e "s!MEDAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.medium.png!" -e "s!LOWAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.low.png!" -e "s!FIREIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/fireemisfire.conus.${exp2}.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIREIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/gbbepxfire.conus.${exp2}.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIREIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hmsfire.conus.${exp}.${TODAY}.t06z.location.day1.k1.png!" ${local_base}/cmaq_pm25_sp.base > ${working_dir}/cmaq_pm25_sp.html

##   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!CMAQPMIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp}.${TODAY}.t06z.21.pm25.k1.png!"  -e "s!CMAQPMIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}.${TODAY}.t06z.21.pm25.k1.png!" -e "s!CMAQPMIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}-${exp}.${TODAY}.t06z.21.pm25.k1.png!" -e "s!HIGHAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.high.png!"  -e "s!MEDAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.medium.png!" -e "s!LOWAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.low.png!" -e "s!FIREIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/fireemisfire.conus.${exp2}.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIREIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/gbbepxfire.conus.${exp2}.${TODAY}.t06z.location.day1.k1.png!" -e "s!FIREIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hmsfire.conus.${exp}.${TODAY}.t06z.location.day1.k1.png!" ${local_base}/cmaq_pm25.base > ${working_dir}/cmaq_pm25.html

   ##
   ## Update the Date Information of Latest Avaialble Figure for Date Selection Restriction
   ##
   sed -e "s!AAAA!${Y0}!" -e "s!BBBB!${Mx}!" -e "s!CCCC!${D0}!"  -e "s!XXXX!${FstY0}!" -e "s!YYYY!${FstMx}!" -e "s!ZZZZ!${FstD0}!" ${local_js}/cmaq_pm_latest.day.js.base > ${working_dir}/cmaq_pm_latest.day.js

cp -p ${local_js}/rrfs_cmaq_pm25.js .
cp -p ${local_js}/rrfs_cmaq_pm25_max.js .
scp *.html ${remote_user}@${remote_machine}:${remote_html}
scp *.js ${remote_user}@${remote_machine}:${remote_js}

exit
