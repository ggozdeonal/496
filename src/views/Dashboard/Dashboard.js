import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Danger from "components/Typography/Danger.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import pic from "assets/img/BP.jpg";
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
      
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" stats icon>
             
          
            </CardHeader>
           
           
            <GridItem xs={12} sm={12} md={12}>
            <h3 className={classes.cardTitle}>
            Hakkımızda
              </h3>
              <p className={classes.cardCategory}><Danger>Temel olarak afetzedelere hizmet etmeyi amaçlamaktayız.</Danger></p>
              <p className={classes.cardCategory}>Afet sonrası evini kaybeden veya evi ikamet etmeye uygun olmayan afetzedelere geçici olarak kalabilecekleri yer bulma imkanı sunarak afet sonrası afetzedelerin mağduriyetini azaltmayı; afet bölgelerinde ihtiyaç duyulan yemek, kıyafet, hijyen ürünleri gibi arzların toplanması için kullanıcılarına etkinlik hazırlama ve bu etkinliklerden haberdar olma olanağı sunmayı hedefliyoruz. Ek olarak evini kaybeden afetzedelerin evcil hayvanları için, gönüllü ev sahiplerinin geçici bakıcılık yapabilmelerine ve kullanıcılarımızın kayıp evcil hayvanlar için ilan verebilmelerine imkan sağlamaktayız.</p>
            </GridItem>      
          </Card>
        </GridItem>
 
  
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" stats icon>
             
          
            </CardHeader>
            <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
            <img src={pic} />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
            <h3 className={classes.cardTitle}>
            Neden BauPhi
              </h3>
            <p className={classes.cardCategory}>Bir gün Zeus ile Hermes insanların erdemini sınamak için tebdili kıyafetle yeryüzüne inmişlerdir. Yorgun iki tanrı kentteki hiçbir ev sahibi tarafından kabul edilmezler, kentin hemen dışındaki tepenin üstündeki bir kulübenin kapısını son kez çalarlar. Yaşlı ve yoksul bir çift olan Baukis ve Philemon tanrıları tanımazlar ama büyük bir sevgiyle kapılarını çalanları evlerine kabul ederler. Evlerinde ne var ne yoksa ikram ederler hatta dinlenmeleri için kendi yataklarını bile verirler. Tanrılar kentten ayrılırken kente bir tufan gönderirler. Seller kenti kaplar ve örter. Tanrılardan ölümlerinin bir olmasını dileyen Baukis ile Philemon'un kulübesinin bulunduğu tepe suların üstünde kalır. Birbirine sarılmış Baukis ile Philemon, ayaklarının toprağa kök saldığını fark ederler ve gövdeleri aynı, dalları farklı bir ıhlamur ve çınar ağacına dönüşürler.</p>
            </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
 
  
    
      </GridContainer>
   
    </div>
  );
}
