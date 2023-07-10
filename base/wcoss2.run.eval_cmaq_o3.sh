#!/bin/bash
module load prod_util
## This script will be called from /data/data003/hhuang/code/edraot_viirs_gridded/plot_edraot_daily_avg.pro
## Will be using the same day as input
## machine=`hostname | cut -d'.' -f1`
## echo $machine
if [[ $# -lt 1 ]]; then
   TODAY=`date +%Y%m%d`
else
   TODAY=$1
fi
cdate=${TODAY}"00"
PDYm1=$(${NDATE} -24 ${cdate} | cut -c1-8)
PDYm2=$(${NDATE} -48 ${cdate} | cut -c1-8)
#
FIRST_AVAIL_DAY=20200901
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
BASE=`pwd`
export local_src="$(dirname ${BASE})"
local_base=${local_src}/base
local_html=${local_src}/html
local_js=${local_src}/js
local_inc=${local_src}/includes
##################################################
## creating new html and js file in working_dir ##
##################################################
working_dir=/lfs/h2/emc/stmp/${USER}/WEB_eval_o3
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
DISPDAY=${PDYm2}
DISPDAY=${TODAY}
Y0=`echo ${DISPDAY} | cut -c1-4`
X0=`echo ${DISPDAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   Mx=`echo ${DISPDAY} | cut -c6-6`
else
   Mx=`echo ${DISPDAY} | cut -c5-6`
fi
D0=`echo ${DISPDAY} | cut -c7-8`
#
# If starting figure is not existed due to any reason,e.g., server down,  do not update the time info of the html and js
#
## Can not check remote file. Keep foe local usage
#
## if [[ -e ${remote_fig}/${Y0}/${TODAY}/hysplitconussmokepbl_03.png ]]; then
   chrstr=${str[${Mx}-1]}   ## keyword for Month

exp1=prodobs
exp2=prodbcobs
exp3=v70c55obs
exp4=v70c55bcobs

   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!CMAQPMIMAGE1!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp1}.${TODAY}.t06z.15.o3.k1.png!"  -e "s!CMAQPMIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}.${TODAY}.t06z.15.o3.k1.png!" -e "s!CMAQPMIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp3}.${TODAY}.t06z.15.o3.k1.png!" -e "s!CMAQPMIMAGE4!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp4}.${TODAY}.t06z.15.o3.k1.png!"  ${local_base}/eval_cmaq_o3.base > ${working_dir}/eval_cmaq_o3.html

exp1=prodobs
exp2=prodbcobs
exp3=v70c55obs
exp4=v70c55bcobs

   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!CMAQPMIMAGE1!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp1}.${TODAY}.t06z.max_8hr_o3.day1.k1.png!"  -e "s!CMAQPMIMAGE2!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp2}.${TODAY}.t06z.max_8hr_o3.day1.k1.png!" -e "s!CMAQPMIMAGE3!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp3}.${TODAY}.t06z.max_8hr_o3.day1.k1.png!" -e "s!CMAQPMIMAGE4!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp4}.${TODAY}.t06z.max_8hr_o3.day1.k1.png!"  ${local_base}/eval_cmaq_o3_max.base > ${working_dir}/eval_cmaq_o3_max.html

   ##
   ## Update the Date Information of Latest Avaialble Figure for Date Selection Restriction
   ##
   sed -e "s!AAAA!${Y0}!" -e "s!BBBB!${Mx}!" -e "s!CCCC!${D0}!"  -e "s!XXXX!${FstY0}!" -e "s!YYYY!${FstMx}!" -e "s!ZZZZ!${FstD0}!" ${local_js}/cmaq_o3_latest.day.js.base > ${working_dir}/eval_o3_latest.day.js

cp -p ${local_js}/eval_cmaq_o3.js .
cp -p ${local_js}/eval_cmaq_o3_max.js .
scp *.html ${remote_user}@${remote_machine}:${remote_html}
scp *.js ${remote_user}@${remote_machine}:${remote_js}

exit
