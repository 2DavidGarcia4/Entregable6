import "./purchases.css"
import React, {useState, useEffect} from 'react'
import { Purchase } from '../../types'
import { PurchaseCard } from './PurchaseCard'

export const PurchasesScreen = ()=> {
  const [purchases, setPurchases] = useState<Purchase[]>([])

  const obtaining = localStorage.getItem("e-commerce") || ""
  const data = obtaining ? JSON.parse(obtaining) : false

  // console.log(new Date("2022-09-07T23:12:12.341Z").toLocaleDateString())

  useEffect(()=> {
  fetch("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {
      method: 'GET',  
      headers: {
        Authorization: `Bearer ${data.user.token}`
      }
    }).then(prom=> prom.json()).then(res=> setPurchases(res.data.purchases)).catch(err=> err)
  }, [])

  // console.log(purchases)

  return (
    <section className="purchases">
      <h2 className='purchases-title'>My purchases</h2>
      <div className="purchases-elements">
        {purchases.map(m=> <PurchaseCard key={m.id} purchase={m} />)}
      </div>
    </section>
  )
}