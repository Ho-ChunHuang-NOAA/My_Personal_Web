#!/bin/bash

## echo $1 $2 $3 $4 $5
s=/data/home001/hhuang/WEB
Y=$1
M=$2
  M0=`echo ${M} | cut -c 1-1`
  if [[ ${M0} == '0' ]]; then
    M0=`echo ${M} | cut -c 2-2`
  else
    M0=`echo ${M} | cut -c 1-2`
  fi
D=$3
jday=$4
sys=$5

if [[ ${sys} == 'web' || ${sys} == 'rgb' ]]; then
  WebFig=ftp://ftp.star.nesdis.noaa.gov/pub/smcd/hhuang/WEB/fig
  LinuxFig=/net/ftp/aftp/pub/smcd/hhuang/WEB/fig
  htmlxx=/net/ftp/aftp/pub/smcd/hhuang/WEB/html
  jsxx=/net/ftp/aftp/pub/smcd/hhuang/WEB/js
else
   if [[ ${sys} == 'pub' ]]; then
     WebFig=ftp://ftp.star.nesdis.noaa.gov/pub/smcd/hhuang/VIIRS_Aerosol_Pub/fig
     htmlxx=/net/ftp/aftp/pub/smcd/hhuang/VIIRS_Aerosol_Pub/html
     LinuxFig=/net/ftp/aftp/pub/smcd/hhuang/VIIRS_Aerosol_Pub/fig
     jsxx=/net/ftp/aftp/pub/smcd/hhuang/VIIRS_Aerosol_Pub/js/
   else
        WebFig=/data/data003/GRAVITE/NPP/data/FIGURE
        htmlxx=`pwd`
   fi
fi

  ## Backward for $MON_BACK MONTHs
  MON_BACK=2
let i=1
let j=$M0
let k=$Y
while [[ ${i} -le ${MON_BACK} ]]; do
  let j=j-1
  if [[ ${j} -eq 0 ]]; then
    let j=12
    let k=k-1
  fi
  let i=i+1
done
if [[ ${k} -le 9 ]]; then
  YS="0"$k
else
  YS=$k
fi
if [[ ${j} -le 9 ]]; then
  MS="0"$j
else
  MS=$j
fi
START_DAY=$YS$MS"01"
START_MON=$YS$MS
##
## MONTHLY DATA AVAILABLE TILL PREVIOUS MONTH  FOR MNA PLOTS
##
let i=$M-1
let j=$Y-1
if [[ ${i} -eq 0 ]]; then
  M1=12
  Y1=$j
else
  Y1=$Y
  if [[ ${i} -lt 9 ]]; then
    M1="0"$i
  else
    M1=$i
  fi
fi
RY=`date +%Y`
CMON=`date +%m`
  RM=`echo ${CMON} | cut -c 1-1`
  if [[ ${RM} == '0' ]]; then
    RM=`echo ${CMON} | cut -c 2-2`
  else
    RM=`echo ${CMON} | cut -c 1-2`
  fi
CDAY=`date +%d`
  RD=`echo ${CDAY} | cut -c 1-1`
  if [[ ${RD} == '0' ]]; then
    RD=`echo ${CDAY} | cut -c 2-2`
  else
    RD=`echo ${CDAY} | cut -c 1-2`
  fi
let i=1
let j=$RM
let k=$RY
while [[ ${i} -le ${MON_BACK} ]]; do
  let j=j-1
  if [[ ${j} -eq 0 ]]; then
    let j=12
    let k=k-1
  fi
  let i=i+1
done
if [[ ${k} -le 9 ]]; then
  RYS="0"$k
else
  RYS=$k
fi
if [[ ${j} -le 9 ]]; then
  RMS="0"$j
else
  RMS=$j
fi
REAL_DAY=$RYS$RMS"01"
EAL_MON=$RYS$R

if [[ ${M0} -le 9 ]]; then
  Mx="0"${M0}
else
  Mx=${M0}
fi
if [[ ${D} -le 9 ]]; then
  Dx="0"${D}
else
  Dx=${D}
fi

declare -a str=( Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec )
chrstr=${str[${M0}-1]}
if [[ ${sys} == 'rgb' && -e "${LinuxFig}/${jday}/ham.viirs_rgb_$Y$Mx$Dx.global.1500x900.png" ]]; then
## echo "$Y $Mx $Dx  update ${sys}"
   sed -e "s!=\"${Dx}\"  > ${Dx}!=\"${Dx}\"  selected > ${Dx}!" -e "s! > ${chrstr}! selected > ${chrstr}!" -e "s! > ${Y}! selected > ${Y}!" -e "s!IMAGE!${WebFig}/${jday}/ham.viirs_rgb_$Y$Mx$Dx.global.1500x900.png!" $s/base/nesdis.viirs.html.${sys}.base > $s/html/nesdis.viirs.${sys}.html
   sed -e "s!AAAA!$Y!" -e "s!BBBB!$Mx!" -e "s!CCCC!$Dx!" ${s}/js/latest.day.js.base > ${s}/js/latest.day.js
   cp -p  ${s}/html/nesdis.viirs.${sys}.html ${htmlxx}
   cp -p  ${s}/js/latest.day.js ${jsxx}
   cp -p  ${s}/js/nesdis.viirs.rgb.js ${jsxx}
fi
if [[ ${sys} == 'web' && -e ${LinuxFig}/${jday}/$Y$Mx$Dx"_High_QF_AOT_550nm.png" ]]; then
## echo "$Y $Mx $Dx  update ${sys}"
   sed -e "s!\"$Dx\" >!\"$Dx\" selected >!" -e "s!\"$Mx\">!\"$Mx\" selected>!" -e "s!\"$Y\" >!\"$Y\" selected>!" -e "s!IMAGE!${WebFig}/${jday}/$Y$Mx$Dx"_High_QF_AOT_550nm.png"!"  $s/base/nesdis.viirs.html.${sys}.base > $s/html/nesdis.viirs.${sys}.html 
   sed -e "s!AAAA!$Y!" -e "s!BBBB!$Mx!" -e "s!CCCC!$Dx!" ${s}/js/latest.day.js.base > ${s}/js/latest.day.js
   cp -p  ${s}/html/nesdis.viirs.${sys}.html ${htmlxx}
   cp -p  ${s}/js/latest.day.js ${jsxx}
fi

if [[ ${sys} == 'pub' && -e ${LinuxFig}/${jday}/"viirs.edr.aot550.Davg.0.25."$Y$Mx$Dx".high.png" ]]; then
## echo "$Y $Mx $Dx  update ${sys}"
   sed -e "s!\"$Dx\" >!\"$Dx\" selected >!" -e "s!\"$Mx\">!\"$Mx\" selected>!" -e "s!\"$Y\" >!\"$Y\" selected>!" -e "s!IMAGE!${WebFig}/${jday}/"viirs.edr.aot550.Davg.0.25."$Y$Mx$Dx".high.png"!"  $s/base/nesdis.viirs.html.${sys}.base > $s/html/nesdis.viirs.${sys}.html 
   sed -e "s!AAAA!$Y!" -e "s!BBBB!$Mx!" -e "s!CCCC!$Dx!" ${s}/js/latest.day.js.base > ${s}/js/latest.day.js
   cp -p  ${s}/html/nesdis.viirs.${sys}.html ${htmlxx}
   cp -p  ${s}/js/latest.day.js ${jsxx}
fi

exit
