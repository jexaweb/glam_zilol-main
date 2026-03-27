import React, { useState } from "react";

export default function Ariza() {

const serviceData = {
  "Gilam yuvish": {
    unit: "dona",
    tariffs: {
      VIP: 25000,
      Premium: 15000,
      Standart: 8000,
    },
  },

  "Mebel yuvish": { unit: "dona" },

  "Parda yuvish": {
    unit: "dona",
    tariffs: {
      Standart: 20000,
      Premium: 30000,
    },
  },

  "Yakkandoz yuvish": {
    unit: "dona",
    tariffs: {
      Standart: 10000,
      Premium: 15000,
    },
  },

  "Ko'rpa yuvish": {
    unit: "dona",
    tariffs: {
      Standart: 15000,
      Premium: 25000,
    },
  },

  "Matras yuvish": { unit: "dona" },
  "Joyida yuvish": { unit: "dona" },
  "O'yinchoqlar yuvish": { unit: "dona" },
  "Yostiqlar yuvish": { unit: "dona" },
  "Avto chixol yuvish": { unit: "dona" },
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

Object.entries(selectedServices).forEach(([service, data], index) => {

const unit = serviceData[service].unit;

if (serviceData[service].tariffs && data.tariff) {

const price = serviceData[service].tariffs[data.tariff];

message += `${index + 1}️⃣ ${service}
Tarif: ${data.tariff}
${price.toLocaleString()} so'm / 1 ${unit}
Soni: ${data.quantity}

`;

} else {

message += `${index + 1}️⃣ ${service}
Soni: ${data.quantity} ${unit}

`;

}

});

message += `✏️ Izoh: ${form.note}`;

await fetch("https://api.telegram.org/bot8789952135:AAEq5VuGMUAa7b094Les1nJm1DCnvM_TaK0/sendMessage", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
chat_id: "6904234957",
text: message,
}),
});

};

const handleSubmit = async (e) => {

e.preventDefault();

// xizmat tanlangan bo‘lsa soni kiritilganini tekshiradi
for (const service in selectedServices) {
  if (!selectedServices[service].quantity) {
    alert(`${service} uchun sonini kiriting ❗`);
    return;
  }
}

await sendTelegram();

alert("Ariza yuborildi ✅");

// formni tozalash
setForm({
  name: "",
  phone: "",
  address: "",
  note: "",
});

setSelectedServices({});
};

return (

<section className="min-h-screen bg-gray-100 flex justify-center items-center p-3 mt-20 sm:p-6">

<form
onSubmit={handleSubmit}
className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-5"
>

<h2 className="text-2xl sm:text-3xl font-bold text-center">
Bururtma qoldirish
</h2>

<input
className="input w-full"
placeholder="Ismingiz"
required
value={form.name}
onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
className="input w-full"
placeholder="Telefon"
required
value={form.phone}
onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>

<div className="space-y-3">

<p className="font-semibold">Xizmatlar:</p>

{Object.keys(serviceData).map((service) => {

const selected = selectedServices[service];
const hasTariff = serviceData[service].tariffs;

return (

<div key={service} className="border p-3 sm:p-4 rounded-xl">

<label className="flex gap-2 items-center text-sm sm:text-base">

<input
type="checkbox"
checked={!!selected}
onChange={() => toggleService(service)}
/>

{service}

</label>

{selected && (

<div className="mt-3 space-y-2">

{hasTariff && (

<select
className="input w-full"
onChange={(e) =>
handleServiceChange(service,"tariff",e.target.value)
}
>

<option>Narx bo'yicha</option>

{Object.entries(serviceData[service].tariffs).map(([name, price]) => (

<option key={name} value={name}>
{name} - {price.toLocaleString()} so'm / 1 {serviceData[service].unit}
</option>

))}

</select>

)}

<input
type="number"
className="input w-full"
placeholder={`Soni (${serviceData[service].unit})`}
onChange={(e) =>
handleServiceChange(service,"quantity",e.target.value)
}
/>

</div>

)}

</div>

);

})}

</div>

<input
className="input w-full"
placeholder="Manzil"
required
value={form.address}
onChange={(e) =>
setForm({ ...form, address: e.target.value })
}
/>

<textarea
className="input w-full"
placeholder="Izoh"
value={form.note}
onChange={(e) =>
setForm({ ...form, note: e.target.value })
}
/>

<button className="w-full bg-amber-500 hover:bg-amber-600 transition text-white py-3 rounded-xl font-semibold">
Ariza yuborish
</button>

</form>

</section>

);

}