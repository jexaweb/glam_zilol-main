import { useState } from "react";

export default function Yakkandoz() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`So'rov yuborildi: ${phone}`);
    setPhone("");
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      
      {/* HERO */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Yakkandoz yuvish xizmati 🧼
            </h1>

            <p className="text-gray-300 mb-6">
              Yakkandozlarni chuqur tozalaymiz, dog‘ va hidlarni yo‘q qilamiz.
              Sifatli va tez xizmat kafolatlanadi.
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Tez xizmat</li>
              <li>✔ Arzon narxlar</li>
              <li>✔ Professional uskunalar</li>
            </ul>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-black"
              />
              <button className="bg-amber-400 px-6 rounded-lg font-semibold">
                Buyurtma
              </button>
            </form>
          </div>

          <img
            src="/img/yakkandoz.jpg"
            className="rounded-2xl shadow-lg"
            alt="Yakkandoz yuvish"
          />
        </div>
      </section>

           {/* SERVICES */}
<section className="py-20 bg-gray-50 text-black">
  <div className="max-w-6xl mx-auto px-4">
    
    <h2 className="text-3xl font-bold text-center mb-12">
      Bizning xizmatlar
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {[
     
        {
          title: "Premium yakandoz yuvish",
          price: "50 000 so'm / 1 dona",
          desc: " 1-3 kunda yetkazib beramiz",
        },
        {
          title: "Standart yakandoz yuvish",
          price: "40 000 so'm / 1 dona",
          desc: "3-7 kunda yetkazib bermiz",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 border"
        >
          {/* ICON */}
          <div className="text-4xl mb-4">🧼</div>

          {/* TITLE */}
          <h3 className="font-semibold text-xl mb-2">
            {item.title}
          </h3>

          {/* PRICE */}
          <p className="text-blue-600 font-bold mb-2">
            {item.price}
          </p>

          {/* DESC */}
          <p className="text-gray-500 mb-4">
            {item.desc}
          </p>

        
        </div>
      ))}
    </div>
  </div>
</section>

      {/* PROCESS */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          
          <h2 className="text-3xl font-bold text-center mb-12">
            Qanday ishlaymiz?
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            
            {[
              "Buyurtma berasiz",
              "Olib ketamiz",
              "Tozalaymiz",
              "Qaytaramiz",
            ].map((step, i) => (
              <div key={i} className="p-4">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  {i + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          <h2 className="text-3xl font-bold mb-10">
            Yakkandoz tariflari
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            {[
              { name: "1 dona ", price: "50 000 so'm" },
              { name: "1 dona (o‘rta)", price: "40 000 so'm" },
          
            ].map((plan, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-amber-400">
                  {plan.price}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-400 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Hoziroq buyurtma bering 🧼
        </h2>
        <p className="mb-6">
          Tozalik — bu sog‘liq!
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Bog‘lanish
        </button>
      </section>

    </div>
  );
}