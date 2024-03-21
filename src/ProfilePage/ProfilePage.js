import React from "react";
import "./ProfilePage.css";
import { useState } from "react";
import "./ProfilePage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import app from "../firestore";
import secureLocalStorage from "react-secure-storage";
const subjects = [
  "Mathematics",
  "Science",
  "Social Science",
  "Physics",
  "Accountancy",
  "Sanskrit",
  "Hindi",
  "English",
  "Biology",
  "History",
  "Geography",
  "Psychology",
  "Sociology",
  "Chemistry",
  "Political Science",
  "Economics",
  "Business Studies",
  "Home Science",
  "Urdu",
  "Fine Art",
  "Computer Science",
]; //TODO: add subjects
const e = {
  SelectState: [],
  AndraPradesh: [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Kadapa",
    "Krishna",
    "Kurnool",
    "Prakasam",
    "Nellore",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
  ],
  ArunachalPradesh: [
    "Anjaw",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kra Daadi",
    "Kurung Kumey",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Subansiri",
    "Namsai",
    "Papum Pare",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
    "Itanagar",
  ],
  Assam: [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup Metropolitan",
    "Kamrup (Rural)",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],
  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Janjgir Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],
  Goa: ["North Goa", "South Goa"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Mewat",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  HimachalPradesh: [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  JammuandKashmir: [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kargil",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Leh",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],
  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  Karnataka: [
    "Bagalkot",
    "Bangalore Rural",
    "Bangalore Urban",
    "Belgaum",
    "Bellary",
    "Bidar",
    "Vijayapura",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Gulbarga",
    "Hassan",
    "Haveri",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysore",
    "Raichur",
    "Ramanagara",
    "Shimoga",
    "Tumkur",
    "Udupi",
    "Uttara Kannada",
    "Yadgir",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  MadhyaPradesh: [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],
  Mizoram: [
    "Aizawl",
    "Champhai",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip",
    "Aizawl",
    "Champhai",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip",
  ],
  Nagaland: [
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Peren",
    "Phek",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Debagarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundergarh",
  ],
  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Firozpur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Mansa",
    "Moga",
    "Mohali",
    "Muktsar",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "Shaheed Bhagat Singh Nagar",
    "Tarn Taran",
  ],
  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Ganganagar",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Tonk",
    "Udaipur",
  ],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  TamilNadu: [
    "Ariyalur",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Salem",
    "Sivaganga",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar",
    "Jogulamba",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal",
    "Nagarkurnool",
    "Nalgonda",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Ranga Reddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Yadadri Bhuvanagiri",
  ],
  Tripura: [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
  ],
  UttarPradesh: [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],
  WestBengal: [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
  AndamanandNicobarIslands: [
    "Nicobar",
    "North Middle Andaman",
    "South Andaman",
  ],
  Chandigarh: ["Chandigarh"],
  DadraandNagarHaveli: ["Dadra Nagar Haveli"],
  DamanandDiu: ["Daman", "Diu"],
  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],
  Lakshadweep: ["Lakshadweep"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
};

function ProfilePage({ user, onLogout, setUser }) {
  const [showModal, setShowModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const openModal = () => {
    if (user.address && user.phone) {
      setShowModal(true);
    } else {
      alert("You need to enter your phone number and address to add books");
    }
  };
  const openPhoneModal = () => {
    setShowPhoneModal(true);
  };

  const openAddressModal = () => {
    setShowAddressModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPhoneModal(false);
    setShowAddressModal(false);
  };

  const addBook = (e) => {
    e.preventDefault();
    const bookName = document.getElementById("bookName").value;
    const bookClass = document.getElementById("ClassSelect").value;
    const bookSubject = document.getElementById("SubjectSelect").value;
    user.books = [
      ...user.books,
      { title: bookName, class: bookClass, subject: bookSubject },
    ];
    const db = getFirestore(app);
    const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
    updateDoc(docRef, user);
    setUser(user);
    closeModal();
  };
  const deleteBook = (e) => {
    const index = Number(e.currentTarget.dataset.number);
    let updatedBooks = user.books.filter((book, i) => i !== index);
    const db = getFirestore(app);
    const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
    updateDoc(docRef, { ...user, books: updatedBooks });
    setUser({ ...user, books: updatedBooks });
  };
  const addPhone = (e) => {
    e.preventDefault();
    const countryCode = document.getElementById("ccode").value;
    const phoneNumber = document.getElementById("pnumber").value;
    user = { ...user, phone: `+${countryCode} ${phoneNumber}` };
    const db = getFirestore(app);
    const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
    updateDoc(docRef, user);
    setUser(user);
    closeModal();
  };
  const addAddress = (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const state = document.getElementById("state").value;
    const district = document.getElementById("inputDistrict").value;
    const addressObj = {
      address,
      state,
      district,
    };
    user = { ...user, address: addressObj };
    const db = getFirestore(app);
    const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
    updateDoc(docRef, user);
    setUser(user);
    closeModal();
  };
  const SelectState = (t) => {
    const val = t.target.value.replaceAll(" ", "");
    const list = e[val];
    var htmlString = "";
    for (var i = 0; i < list.length; i++) {
      htmlString =
        htmlString + "<option value='" + list[i] + "'>" + list[i] + "</option>";
    }
    document.getElementById("inputDistrict").innerHTML = htmlString;
  };
  const deleteAddress = () => {
    if (!user.books.length) {
      const { address, ...newUser } = user;

      const db = getFirestore(app);
      const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
      updateDoc(docRef, newUser);
      setUser(newUser);
      closeModal();
    } else {
      alert("You need to delete all your books before deleting the address");
    }
  };
  const deletePhone = () => {
    if (!user.books.length) {
      const { phone, ...newUser } = user;
      const db = getFirestore(app);
      const docRef = doc(db, "users", secureLocalStorage.getItem("userToken"));
      updateDoc(docRef, newUser);
      setUser(newUser);
      closeModal();
    } else {
      alert(
        "You need to delete all your books before deleting the phone number"
      );
    }
  };
  return (
    <div className="profile-page-box">
      <h1>Hello, {user.name}</h1>
      <button onClick={onLogout} className="profile-page-logout-button">
        Logout
      </button>

      <div className="user-info">
        <img src={user.picture} alt="Profile" />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ marginRight: "2px" }}>
            Phone number: {user.phone || "Not added"}
          </p>
          {!user.phone && (
            <button
              style={{ marginLeft: "2px" }}
              onClick={openPhoneModal}
              className="profile-page-add-btn"
            >
              Add
            </button>
          )}
          {user.phone && (
            <button
              style={{ marginLeft: "2px" }}
              onClick={openPhoneModal}
              className="profile-page-add-btn"
            >
              Edit
            </button>
          )}{" "}
          {user.phone && (
            <button
              style={{ marginLeft: "2px" }}
              onClick={deletePhone}
              className="profile-page-add-btn"
            >
              Delete
            </button>
          )}
        </div>
        {showPhoneModal && (
          <div className="modal">
            <Modal show={showPhoneModal} onHide={closeModal} centered autoFocus>
              <form onSubmit={addPhone}>
                <Modal.Header closeButton>
                  <Modal.Title>Add phone number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <label htmlFor="ccode">Country code: </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <p>+</p>
                    <input
                      className="form-control-plaintext"
                      type="number"
                      id="ccode"
                      value="91"
                      readOnly
                      required
                    />
                  </div>
                  <label htmlFor="pnumber">Phone number: </label>
                  <input
                    defaultValue={user.phone ? user.phone.slice(4) : ""}
                    className="form-control"
                    type="text"
                    placeholder="9555251539"
                    id="pnumber"
                    required
                    pattern="[0-9]{10}"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                  <Button className="btn btn-primary" type="submit">
                    Add
                  </Button>
                </Modal.Footer>{" "}
              </form>
            </Modal>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ marginRight: "2px" }}>
            Address:
            {user.address
              ? ` ${user.address.address}, ${user.address.district}, ${user.address.state}`
              : " Not added"}
          </p>
          {!user.address && (
            <button
              style={{ marginLeft: "2px" }}
              onClick={openAddressModal}
              className="profile-page-add-btn"
            >
              Add
            </button>
          )}
          {user.address && (
            <button
              style={{ marginLeft: "2px" }}
              onClick={openAddressModal}
              className="profile-page-add-btn"
            >
              Edit
            </button>
          )}{" "}
          {user.address && (
            <button
              style={{ marginLeft: "2px" }}
              onClick={deleteAddress}
              className="profile-page-add-btn"
            >
              Delete
            </button>
          )}
        </div>
        {showAddressModal && (
          <div className="modal">
            <Modal
              show={showAddressModal}
              onHide={closeModal}
              centered
              autoFocus
              onShow={() => {
                if (user.address?.state) {
                  SelectState({ target: { value: user.address.state } });
                  document.getElementById("inputDistrict").value =
                    user.address.district;
                }
              }}
            >
              <form onSubmit={addAddress}>
                <Modal.Header closeButton>
                  <Modal.Title>Add the Pickup Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <label htmlFor="address">Local address: </label>
                  <input
                    defaultValue={
                      user.address?.address ? user.address.address : ""
                    }
                    className="form-control"
                    type="text"
                    placeholder="Enter local address"
                    id="address"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Do not enter your exact address, just a rough locality. This
                    address will be public. Example: Sector 4<br></br>
                  </small>
                  <label htmlFor="bookName">Country: </label>
                  <input
                    className="form-control-plaintext"
                    type="text"
                    id="acountry"
                    value="India"
                    required
                    readOnly
                  />
                  <label htmlFor="inputState">State</label>
                  <select
                    className="form-control"
                    id="state"
                    onChange={SelectState}
                    defaultValue={user.address?.state}
                  >
                    <option value="SelectState">Select State</option>
                    <option value="Andra Pradesh">Andra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option
                      disabled
                      style={{
                        backgroundColor: "#aaa",
                        color: "#fff",
                      }}
                    >
                      UNION Territories
                    </option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli">
                      Dadra and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                  <label htmlFor="inputDistrict">District</label>
                  <select className="form-control" id="inputDistrict">
                    <option value="">-- select a state--</option>
                  </select>{" "}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                  <Button className="btn btn-primary" type="submit">
                    Add
                  </Button>
                </Modal.Footer>{" "}
              </form>
            </Modal>
          </div>
        )}
      </div>
      <div className="user-books">
        <h2>Books</h2>
        <button onClick={openModal} className="profile-page-add-btn">
          Add new books
        </button>
        {showModal && (
          <div className="modal">
            <Modal show={showModal} onHide={closeModal} centered autoFocus>
              <form onSubmit={addBook}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <label htmlFor="bookName">Book name/Author:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter book name"
                    id="bookName"
                    required
                  />
                  <label htmlFor="ClassSelect">Class:</label>
                  <select className="form-control" id="ClassSelect">
                    {[...Array(12)].map((e, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="SubjectSelect">Subject:</label>
                  <select className="form-control" id="SubjectSelect">
                    {subjects.map((e, i) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                  <Button className="btn btn-primary" type="submit">
                    Submit form
                  </Button>
                </Modal.Footer>{" "}
              </form>
            </Modal>
          </div>
        )}
        <ol>
          {user.books && user.books.length > 0 ? (
            user.books.map((book, index) => {
              return (
                <div className="bookDiv">
                  <li key={index}>
                    {book.title}
                    <br /> {book.subject}
                    <br /> Grade: {book.class}
                  </li>

                  <button
                    className="bin-btn"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    data-number={index}
                    onClick={deleteBook}
                  >
                    <img
                      src="/bin.svg"
                      alt="Delete book"
                      style={{
                        width: "1em",
                        height: "1em",
                        margin: "auto",
                      }}
                    ></img>
                  </button>
                </div>
              );
            })
          ) : (
            <li>No books found</li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default ProfilePage;
