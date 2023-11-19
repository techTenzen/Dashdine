import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        
        if(!response.ok) {
          throw new Error('Failed to fetch orders'); 
        }

        const data = await response.json();
        setOrders(data);

      } catch(error) {
        setError(error.message);
      }
    };

    fetchOrders();

  }, []);
 const formatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };
  // Date formatting function

  if(error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      
      <h2>Order History</h2>

      {orders.length ? (
        orders.map(order => {
          return (
            <div className="card">
              
              {/* Date */}
              {order.order_data && (
                <p>{formatDate(order.order_data[0][0].Order_date)}</p>
              )}
              
              {/* Items */}
              {order.order_data && order.order_data.slice(1,-1).map(items => (
                items.map(item => (
                  <div>
                    <h5>{item.name}</h5>
                    <p>₹{item.price}</p> 
                  </div>
                ))
              ))}
              
              {/* Total */}
              {order.order_data && order.order_data.length > 1 && ( 
                <p>
                  Total: ₹{order.order_data[order.order_data.length-1][0].totalPrice}
                </p>
              )}

            </div>
          );
        })
      ) : (
        <p>No orders found.</p>  
      )}

    </div>
  );

}
  

