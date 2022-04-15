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
version=ver2
FIRST_AVAIL_DAY=20141001
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
X0=`echo ${TODAY} | cut -c5-5`
if [[ ${X0} == "0" ]]; then
   Mx=`echo ${TODAY} | cut -c6-6`
else
   Mx=`echo ${TODAY} | cut -c5-6`
fi
D0=`echo ${TODAY} | cut -c7-8`

cdate=${TODAY}"00"
TOMORROW=$(${NDATE} +24 ${cdate}| cut -c1-8)
#
# If starting figure is not existed due to any reason,e.g., server down,  do not update the time info of the html and js
#
## Can not check remote file. Keep foe local usage
#
   chrstr=${str[${Mx}-1]}   ## keyword for Month

   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!PRODIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hysplitconussmokepbl_21_prod.png!"  -e "s!PARAIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hysplitconussmokepbl_21_para82h.png!" -e "s!DIFFIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/hysplitconussmokepbl_21_para82hmprod.png!" -e "s!HIGHGAOD!${WebFig}/${Y0}/${TODAY}/hysplit.conus.g16.${TODAY}.01.aod.high.png!"  -e "s!MEDGAOD!${WebFig}/${Y0}/${TODAY}/hysplit.conus.g16.${TODAY}.01.aod.medium.png!"  -e "s!LOWGAOD!${WebFig}/${Y0}/${TODAY}/hysplit.conus.g16.${TODAY}.01.aod.low.png!" -e "s!HIGHVAOD!${WebFig}/${Y0}/${TODAY}/hysplit.conus.viirs.${TODAY}.21.smkaod.high.png!" -e "s!MEDVAOD!${WebFig}/${Y0}/${TODAY}/hysplit.conus.viirs.${TODAY}.21.smkaod.medium.png!" ${local_base}/hysplit_emc.base > ${working_dir}/hysplit_emc.html

   ##
   ## Update the Date Information of Latest Avaialble Figure for Date Selection Restriction
   ##
   sed -e "s!AAAA!${Y0}!" -e "s!BBBB!${Mx}!" -e "s!CCCC!${D0}!"  -e "s!XXXX!${FstY0}!" -e "s!YYYY!${FstMx}!" -e "s!ZZZZ!${FstD0}!" ${local_js}/latest.day.js.base > ${working_dir}/latest.day.js

cp -p ${local_js}/hysplit_emc.js .
scp *.html ${remote_user}@${remote_machine}:${remote_html}
scp *.js ${remote_user}@${remote_machine}:${remote_js}
exit
