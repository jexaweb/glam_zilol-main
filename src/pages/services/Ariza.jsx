import React, { useState } from "react";

export default function Ariza() {

const serviceData = {
  "Gilam yuvish": {
    unit: "m²",
    tariffs: {
      Standart: 8000,
      Premium: 15000,
      VIP: 25000,
    },
  },

  "Parda yuvish": {
    unit: "kg",
    tariffs: {
      Standart: 20000,
      Premium: 30000,
    },
  },
};

const [form, setForm] = useState({
  name: "",
  phone: "",
  address: "",
  note: "",
});

const [selectedServices, setSelectedServices] = useState({});

const toggleService = (service) => {

  const updated = { ...selectedServices };

  if (updated[service]) {
    delete updated[service];
  } else {
    updated[service] = { tariff: "", quantity: "" };
  }

  setSelectedServices(updated);
};

const handleServiceChange = (service, field, value) => {

  setSelectedServices({
    ...selectedServices,
    [service]: {
      ...selectedServices[service],
      [field]: value,
    },
  });

};

const sendTelegram = async () => {

let message = `🧼 Yangi ariza

👤 Ism: ${form.name}
📞 Telefon: ${form.phone}
📍 Manzil: ${form.address}

`;

Object.entries(selectedServices).forEach(
([service, data], index) => {

const price = serviceData[service].tariffs[data.tariff];
const unit = serviceData[service].unit;

message += `${index + 1}️⃣ Xizmat: ${service} - ${data.tariff} ${price.toLocaleString()} so'm / 1 ${unit} - Soni: ${data.quantity} ta

`;

}
);

message += `✏️ Izoh: ${form.note}`;

await fetch(
"https://api.telegram.org/botBOT_TOKEN/sendMessage",
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
chat_id: "CHAT_ID",
text: message,
}),
}
);

};

const handleSubmit = (e) => {

e.preventDefault();
sendTelegram();
alert("Ariza yuborildi ✅");

};

return (

<section className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-5"
>

<h2 className="text-3xl font-bold text-center">
Ariza qoldirish
</h2>

<input
className="input"
placeholder="Ismingiz"
required
onChange={(e) =>
setForm({ ...form, name: e.target.value })
}
/>

<input
className="input"
placeholder="Telefon"
required
onChange={(e) =>
setForm({ ...form, phone: e.target.value })
}
/>

{/* xizmatlar */}

<div className="space-y-2">

<p className="font-semibold">Xizmatlar:</p>

{Object.keys(serviceData).map((service) => (

<label key={service} className="flex gap-2 items-center">

<input
type="checkbox"
onChange={() => toggleService(service)}
/>

{service}

</label>

))}

</div>

{/* xizmat sozlamalari */}

{Object.entries(selectedServices).map(
([service, data], index) => (

<div key={service} className="border p-4 rounded-xl space-y-2">

<p className="font-semibold">{service}</p>

<select
className="input"
onChange={(e) =>
handleServiceChange(
service,
"tariff",
e.target.value
)
}
>

<option>Tarif tanlang</option>

{Object.entries(serviceData[service].tariffs).map(
([name, price]) => (

<option key={name} value={name}>

{name} - {price.toLocaleString()} so'm / 1{" "}
{serviceData[service].unit}

</option>

)
)}

</select>

<input
type="number"
className="input"
placeholder={`Soni (${serviceData[service].unit})`}
onChange={(e) =>
handleServiceChange(
service,
"quantity",
e.target.value
)
}
/>

{/* preview */}

{data.tariff && data.quantity && (

<div className="bg-yellow-50 border p-2 rounded">

{index + 1}️⃣ Xizmat: {service} - {data.tariff}{" "}
{serviceData[service].tariffs[
data.tariff
].toLocaleString()} so'm / 1{" "}
{serviceData[service].unit} - Soni: {data.quantity} ta

</div>

)}

</div>

)
)}

<input
className="input"
placeholder="Manzil"
required
onChange={(e) =>
setForm({ ...form, address: e.target.value })
}
/>

<textarea
className="input"
placeholder="Izoh"
onChange={(e) =>
setForm({ ...form, note: e.target.value })
}
/>

<button className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold">

Ariza yuborish

</button>

</form>

</section>

);

}