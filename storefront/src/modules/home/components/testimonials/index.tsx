const Testimonials = () => {
    return (
      <section className="bg-gray-100 py-12">
        <div className="content-container">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg italic">"Amazing products! High quality and great customer service."</p>
              <p className="mt-4 text-right font-bold">- Jane Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg italic">"I love the variety and the prices are unbeatable."</p>
              <p className="mt-4 text-right font-bold">- John Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg italic">"Fast shipping and excellent customer support. Highly recommend!"</p>
              <p className="mt-4 text-right font-bold">- Emily Johnson</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Testimonials