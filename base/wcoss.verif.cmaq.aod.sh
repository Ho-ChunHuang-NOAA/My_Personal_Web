#!/bin/sh
module load prod_util/1.1.6

## This script will be called from /data/data021/hhuang/code/edraot_viirs_gridded/plot_edraot_daily_avg.pro
## Will be using the same day as input
## machine=`hostname | cut -d'.' -f1`
## echo $machine
if [[ $# < 1 ]]; then
   TODAY=`date +%Y%m%d`
else
   TODAY=$1
fi
#
FIRST_AVAIL_MON=201906
FstY0=`echo ${FIRST_AVAIL_MON} | cut -c1-4`
X0=`echo ${FIRST_AVAIL_MON} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   FstMx=`echo ${FIRST_AVAIL_MON} | cut -c6-6`
else
   FstMx=`echo ${FIRST_AVAIL_MON} | cut -c5-6`
fi
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
working_dir=/gpfs/dell2/stmp/${USER}/WEB
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
YM=`echo ${TODAY} | cut -c1-6`
X0=`echo ${TODAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   Mx=`echo ${TODAY} | cut -c6-6`
else
   Mx=`echo ${TODAY} | cut -c5-6`
fi

cdate=${TODAY}"00"
TOMORROW=$(${NDATE} +24 ${cdate}| cut -c1-8)
#
# If starting figure is not existed due to any reason,e.g., server down,  do not update the time info of the html and js
#
## Can not check remote file. Keep foe local usage
#
   chrstr=${str[${Mx}-1]}   ## keyword for Month
##
## evaluation directory fixed by firstday of evaluation period
##
   Y0_eval='2020'
   YM_eval='202003'
   chrstr_eval='Mar'             ## keyword for Month

   sed -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!VERIFAODIMAGE!${WebFig}/${Y0}/${YM}/FULL_CMAQ_AOD_CSI_DAY1_06Z_HIGH_${YM}.png!" ${local_base}/verif_cmaq_aod.base > ${working_dir}/verif_cmaq_aod.html

##   sed -e "s! > ${chrstr_eval}! selected > ${chrstr_eval}!" -e "s! > ${Y0_eval}! selected > ${Y0_eval}!"  -e "s!VERIFAODIMAGE!${WebFig}/${Y0_eval}/${YM_eval}/FULL_CMAQV5PARA8_AOD_CSI_DAY1_06Z_HIGH_${YM_eval}.png!" ${local_base}/verif_cmaq_aod_eval.base > ${working_dir}/verif_cmaq_aod_eval.html
   sed -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!VERIFAODIMAGE!${WebFig}/${Y0}/${YM}/FULL_CMAQV5PARA8_AOD_CSI_DAY1_06Z_HIGH_${YM}.png!" ${local_base}/verif_cmaq_aod_eval.base > ${working_dir}/verif_cmaq_aod_eval.html

   sed -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!VERIFAODIMAGE!${WebFig}/${Y0}/${YM}/FULL_CMAQV5PARA8_AOD_CSI_DAY1_06Z_HIGH_${YM}.png!" ${local_base}/verif_cmaq_aod.base > ${working_dir}/verif_cmaq_aod.html

   ##
   ## Update the Date Information of Latest Avaialble Figure for Date Selection Restriction
   ##
   sed -e "s!AAAA!${Y0}!" -e "s!BBBB!${Mx}!" -e "s!XXXX!${FstY0}!" -e "s!YYYY!${FstMx}!" ${local_js}/latest.mon.js.base > ${working_dir}/latest.mon.js

cp -p ${local_js}/verif_cmaq_aod.js .
cp -p ${local_js}/verif_cmaq_aod_eval.js .
scp *.html ${remote_user}@${remote_machine}:${remote_html}
scp *.js ${remote_user}@${remote_machine}:${remote_js}
exit
