import React, { useState } from 'react';


const userData = {
    "gender": "female",
    "name": {
      "title": "Miss",
      "first": "Jennie",
      "last": "Nichols"
    },
    "location": {
      "street": {
        "number": 8929,
        "name": "Valwood Pkwy",
      },
      "city": "Billings",
      "state": "Michigan",
      "country": "United States",
      "postcode": "63104",
      "coordinates": {
        "latitude": "-69.8246",
        "longitude": "134.8719"
      },
      "timezone": {
        "offset": "+9:30",
        "description": "Adelaide, Darwin"
      }
    },
    "email": "jennie.nichols@example.com",
    "login": {
      "uuid": "7a0eed16-9430-4d68-901f-c0d4c1c3bf00",
      "username": "yellowpeacock117",
      "password": "addison",
      "salt": "sld1yGtd",
      "md5": "ab54ac4c0be9480ae8fa5e9e2a5196a3",
      "sha1": "edcf2ce613cbdea349133c52dc2f3b83168dc51b",
      "sha256": "48df5229235ada28389b91e60a935e4f9b73eb4bdb855ef9258a1751f10bdc5d"
    },
    "dob": {
      "date": "1992-03-08T15:13:16.688Z",
      "age": 30
    },
    "registered": {
      "date": "2007-07-09T05:51:59.390Z",
      "age": 14
    },
    "phone": "(272) 790-0888",
    "cell": "(489) 330-2385",
    "id": {
      "name": "SSN",
      "value": "405-88-3636"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/75.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
    },
    "nat": "US"
  }

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(userData.name.first);
  const [inputValue, setInputValue] = useState(text);
  // const [userData, setUserData] = useState(userData);


  const handleEditClick = () => {
    setInputValue(text);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setText(inputValue);
    userData.name.first=text;
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
    return(
        <div className="flex flex-col h-full border border-x-none rounded-lg"> 
            <div className="min-h-[110px] bg-white bg-opacity-20 flex flex-row items-end px-4">
                <div className="w-full flex flex-row justify-center items-center py-5">
                        <svg class="w-6 mr-2 text-white-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="5" y1="12" x2="11" y2="18" />  <line x1="5" y1="12" x2="11" y2="6" /></svg>
                        <div className="text-lg w-full self-end ml-2 text-white">Profile</div> 
                </div>
            </div>
            <div className="flex flex-col">
              <img className="rounded-full m-20 mt-10" src="https://randomuser.me/api/portraits/thumb/men/79.jpg" alt="" />
              <div className='ml-10 mb-5'>Your Name</div>
              <div className='w-full'>
                {isEditing ? (
                  <div className='flex flex-row items align-center justify-center'>
                    <input className=" bg-white w-full bg-opacity-10 h-[33px] rounded-lg outline-none  ml-10 px-4 text-sm text-white placeholder-white"
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={() => setIsEditing(false)}
                    />
                    <svg onClick={() => handleSaveClick} class="h-12 w-12 text-white mr-5"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="20 6 9 17 4 12" /></svg>
                  </div>

                   
                  ) : (
                      <div className='flex flex-row ml-10 w-full'>
                        <span className='pr-40'>{userData.name.first}</span>
                        <svg onClick={handleEditClick} class="h-7 w-7 text-white cursor-pointer "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>

                      </div>
                  )}
              </div>
            </div>
            

    
            
        </div>
            
        
    );
}

export default Profile;