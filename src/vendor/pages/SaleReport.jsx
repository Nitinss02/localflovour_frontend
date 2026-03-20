import React from 'react'
import DailySalesReport from '../components/DailySalesReport'
import OrderStatusChart from '../components/OrderStatusChart'

function SaleReport() {
  return (
    <div>
      <DailySalesReport />
      <OrderStatusChart />
    </div>
  )
}

export default SaleReport