import GiftExperience from '../../gift/[token]/GiftExperience';

const DEMOS = {
  '3d-bar': {
    gift:{customer_name:'Josephine Kellum',recipient_name:'Fiona',product_category:'Necklace',product_family:'3D Bar',personalization_type:'names',eta:'Monday 28',coupon:'XMAS30',coupon_value:'$30'},
    details:['XAVIER','JAVAUGHN','JAHMARLEY','FIONA']
  },
  'charming-heart': {
    gift:{customer_name:'Emily Crain',recipient_name:'Emily',product_category:'Necklace',product_family:'Charming Heart',personalization_type:'names',eta:'Monday 28',coupon:'XMAS30',coupon_value:'$30'},
    details:['Emma','Noah','Olivia','Jack']
  },
  'bracelet': {
    gift:{customer_name:'Deidre Hewling',recipient_name:'Erin',product_category:'Bracelet',product_family:'Men Bracelet / Beads',personalization_type:'initials',eta:'Monday 28',coupon:'XMAS30',coupon_value:'$30'},
    details:['B','K','M']
  },
  'no-giftee': {
    gift:{customer_name:'Tahnee Norton',recipient_name:'',product_category:'Bracelet',product_family:'Men Bracelet / Beads',personalization_type:'initials',eta:'Monday 28',coupon:'XMAS30',coupon_value:'$30'},
    details:['K','M','C']
  }
};

export default async function DemoPage({params}){
  const {id}=await params;
  const demo=DEMOS[id];
  if(!demo) return <main style={{padding:40,fontFamily:'sans-serif'}}>Demo not found.</main>;
  return <GiftExperience gift={demo.gift} details={demo.details}/>;
}
