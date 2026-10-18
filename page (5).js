import OakExperience from './OakExperience';
export const metadata={title:'Oak & Luna | Christmas Gift Experience'};
export default function OakLunaPage(){const gift={recipient_name:'Fiona',customer_name:'Alex',personalization_type:'initials',eta:'Monday 28'};return <div className="oakLuna"><OakExperience gift={gift} details={['A','M','J','S']}/></div>;}
