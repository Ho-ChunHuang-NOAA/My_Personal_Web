#!/bin/bash
# set -x
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
exp=prod
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
BASE=`pwd`
export local_src="$(dirname ${BASE})"
local_base=${local_src}/base
local_html=${local_src}/html
local_js=${local_src}/js
local_inc=${local_src}/includes
##################################################
## creating new html and js file in working_dir ##
##################################################
working_dir=/lfs/h2/emc/ptmp/${USER}/WEB/global_aod
mkdir -p ${working_dir}
cd ${working_dir}
/bin/rm -rf *
##################################################

## Remote Login Information
remote_machine=emcrzdm.ncep.noaa.gov
remote_user=hchuang
## Remote Target Directory
remote_src=/home/people/emc/www/htdocs/mmb/hchuang/web
remote_http=https://www.emc.ncep.noaa.gov/mmb/hchuang/web
remote_html=${remote_src}/html
remote_js=${remote_src}/js
remote_inc=${remote_src}/includes

remote_fig=${remote_src}/fig
WebFig=${remote_http}/fig

GEFS_WebFia=https://www.emc.ncep.noaa.gov/gc_wmb/parthab/For_HoChun/

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
## noimage="https://www.emc.ncep.noaa.gov/users/verification/style/images/noimage.png"
noimage1="https://www.emc.ncep.noaa.gov/mmb/hchuang/style/images/rrfs-blank_image.png"
noimage2="https://www.emc.ncep.noaa.gov/mmb/hchuang/style/images/web_blank_figure.png"
url1="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/t06z/gefs.conus.prod.${TODAY}.t06z.15.pm25.k1.png"
url2="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/t06z/aqm.conus.prod.${TODAY}.t06z.15.pm25.k1.png"
url3=${noimage1}
url4="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/t06z/gefs.conus.prod.${TODAY}.t06z.15.aod.k1.png"
url5="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/t06z/aqm.conus.prod.${TODAY}.t06z.15.aod.k1.png"
url6=${noimage1}
url7="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.high.png"
url8="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/aqm.conus.viirs.${TODAY}.21.aod.high.png"
url9=${noimage2}
url10="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.high.png"
url11="https://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/${Y0}/${TODAY}/aqm.conus.viirs.${TODAY}.21.aod.high.png"
   chrstr=${str[${Mx}-1]}   ## keyword for Month

   ## sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!GEFSPMIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/gefs.conus.${exp}.${TODAY}.t06z.15.pm25.k1.png!"  -e "s!CMAQPMIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp}.${TODAY}.t06z.15.pm25.k1.png!" -e "s!RRFSPMIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/rrfs.conus.${exp}.${TODAY}.t06z.15.pm25.k1.png!" -e "s!GEFSAODIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/gefs.conus.${exp}.${TODAY}.t06z.15.aod.k1.png!"  -e "s!CMAQAODIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/aqm.conus.${exp}.${TODAY}.t06z.15.aod.k1.png!" -e "s!RRFSAODIMAGE!${WebFig}/${Y0}/${TODAY}/t06z/rrfs.conus.${exp}.${TODAY}.t06z.15.aod.k1.png!" -e "s!GLBGOESAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.high.png!"  -e "s!GLBVIIRSAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.viirs.${TODAY}.21.aod.high.png!" -e "s!REGGOESAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.g16.${TODAY}.21.aod.high.png!" -e "s!REGVIIRSAOD!${WebFig}/${Y0}/${TODAY}/aqm.conus.viirs.${TODAY}.21.aod.high.png!" ${local_base}/global_aod.base > ${working_dir}/global_aod.html
   sed -e "s!=\"${D0}\"  > ${D0}!=\"${D0}\"  selected > ${D0}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y0}! selected > ${Y0}!"  -e "s!GEFSPMIMAGE!${url1}!"  -e "s!CMAQPMIMAGE!${url2}!" -e "s!RRFSPMIMAGE!${url3}!" -e "s!GEFSAODIMAGE!${url4}!"  -e "s!CMAQAODIMAGE!${url5}!" -e "s!RRFSAODIMAGE!${url6}!" -e "s!GLBGOESAOD!${url7}!"  -e "s!GLBVIIRSAOD!${url8}!" -e "s!NULLPAGE!${url9}!" -e "s!REGGOESAOD!${url10}!" -e "s!REGVIIRSAOD!${url11}!" ${local_base}/global_aod.base > ${working_dir}/global_aod.html

   ##
   ## Update the Date Information of Latest Avaialble Figure for Date Selection Restriction
   ##
   sed -e "s!AAAA!${Y0}!" -e "s!BBBB!${Mx}!" -e "s!CCCC!${D0}!"  -e "s!XXXX!${FstY0}!" -e "s!YYYY!${FstMx}!" -e "s!ZZZZ!${FstD0}!" ${local_js}/global_aod_latest.day.js.base > ${working_dir}/global_aod_latest.day.js

chmod 755 ${working_dir}/global_aod_latest.day.js
cp -p ${local_js}/global_aod.js .
scp *.html ${remote_user}@${remote_machine}:${remote_html}
scp *.js ${remote_user}@${remote_machine}:${remote_js}

exit
