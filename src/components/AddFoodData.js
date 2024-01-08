import React, { useState } from "react";
import "./AddFoodData.css";

//firebase imports
import { db, storage } from "../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddFoodData = () => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [foodCategory, setFoodCategory] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  //
  const [foodType, setFoodType] = useState("");
  const [mealType, setMealType] = useState("");
  const [foodAddon, setFoodAddon] = useState("");
  const [foodAddonPrice, setFoodAddonPrice] = useState("");
  //
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurentEmail, setRestaurantEmail] = useState("");
  const [restaurantAddressBuilding, setResturentAddressBuilding] = useState("");
  const [restaurentAddressStreet, setRestaurentAddressStreet] = useState("");
  const [restaurantAddressCity, setRestaurentAddressCity] = useState("");
  const [restaurntAddressPincode, setRestaurentAddressPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (foodImage == null) {
      alert("please select an image");
      return;
    } else {
      const imageRef = ref(storage, `FoodImages/${foodImage.name}`);
      uploadBytes(imageRef, foodImage)
        .then(() => {
          alert("Image uploaded sucessfully");
          getDownloadURL(imageRef).then((url) => {
            // console.log(url);

            const foodData = {
              foodName,
              foodPrice,
              foodImageUrl: url,
              foodCategory,
              foodDescription,
              restaurantName,
              restaurantPhone,
              foodType,
              mealType,
              foodAddon,
              foodAddonPrice,
              restaurentEmail,
              restaurantAddressBuilding,
              restaurentAddressStreet,
              restaurantAddressCity,
              restaurntAddressPincode,
              id: new Date().getTime().toString(),
            };
            // console.log(foodData);
            try {
              const docRef = addDoc(collection(db, "FoodData"), foodData);
              alert("Data added successfully", docRef.id);
            } catch (error) {
              alert("Error adding document: ", error);
            }
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="form-outer">
      <h1>Add food data</h1>
      <form className="form-inner">
        <label>Food Name</label>
        <input
          type="text"
          name="food_name"
          onChange={(e) => setFoodName(e.target.value)}
        />
        <div className="input-gap">
          <label>Food Description</label>
          <input
            type="text"
            name="food_description"
            onChange={(e) => setFoodDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Food Price</label>
            <input
              type="number"
              name="food_price"
              onChange={(e) => setFoodPrice(e.target.value)}
            />
          </div>
          <div className="form-col">
            <label>Food Type</label>
            <select
              name="food_type"
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option value="null">Select Food Type</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label>Food Category</label>
            <select
              name="food_category"
              onChange={(e) => setFoodCategory(e.target.value)}
            >
              <option value="null">Select Food Category</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Maxium</option>
              <option value="non-veg">American</option>
            </select>
          </div>
          <div className="form-col">
            <label>Meal Type</label>
            <select
              name="meal_type"
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="null">Select Meal Type</option>
              <option value="dinner">Dinner</option>
              <option value="starter">Starter</option>
              <option value="breakfast">Breakfast</option>
              <option value="liquid">Liquid</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label>Add On Name</label>
            <input
              type="text"
              name="food_addon"
              onChange={(e) => setFoodAddon(e.target.value)}
            />
          </div>
          <div className="form-col">
            <label>Add On Price</label>
            <input
              type="text"
              name="food_addon_price"
              onChange={(e) => setFoodAddonPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="input-gap">
          <label>Food Image</label>
          <input
            type="file"
            name="food_image"
            onChange={(e) => setFoodImage(e.target.files[0])}
          />
        </div>
        <div className="input-gap">
          <label>Restaurent Name</label>
          <input
            type="text"
            name="restaurent_name"
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Restaurnt Building Number/Name</label>
            <input
              type="text"
              name="restaurnt_address_building"
              onChange={(e) => setResturentAddressBuilding(e.target.value)}
            />
          </div>
          <div className="form-col">
            <label>Restaurnt Street / Area Name</label>
            <input
              type="text"
              name="restaurent_address_street"
              onChange={(e) => setRestaurentAddressStreet(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label>Restaurnet City</label>
            <input
              type="text"
              name="restaurnt_address_city"
              onChange={(e) => setRestaurentAddressCity(e.target.value)}
            />
          </div>
          <div className="form-col">
            <label>Restaurant city Pin-code</label>
            <input
              type="number"
              name="restaurent_address_pincode"
              onChange={(e) => setRestaurentAddressPincode(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-col">
            <label>Restaurent Phone</label>
            <input
              type="number"
              name="restaurent_phone"
              onChange={(e) => setRestaurantPhone(e.target.value)}
            />
          </div>
          <div className="form-col">
            <label>Restaurent Email</label>
            <input
              type="email"
              name="restaurent_email"
              onChange={(e) => setRestaurantEmail(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleSubmit}>Add Food</button>
      </form>
    </div>
  );
};

export default AddFoodData;
