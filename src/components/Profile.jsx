import React, { useEffect, useState } from 'react'
import { UserCard } from './UserCard'
import { useSelector } from 'react-redux'

export const Profile = () => {
  const user = useSelector((store) => store.user)

  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [age, setAge] = useState(user?.age)
  const [about, setAbout] = useState(user?.about)
  const [skills, setSkills] = useState(user?.skills)
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
  const [gender, setGender] = useState(user?.gender)

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setAge(user.age)
      setGender(user.gender)
      setPhotoUrl(user.photoUrl)
      setSkills(user.skills)
      setAbout(user.about)
    }
  }, [user])

  const updateProfile = async () => {
    try {
      const res = await fetch(`${Base_Url}/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          gender,
          skills,
          about,
          photoUrl,
        }),
      })

      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-4 w-full">

      {/* LEFT SIDE — User Preview */}
      {user && (
        <div className="w-full lg:w-1/3 flex justify-center">
          <UserCard feed={{ firstName, lastName, age, gender, skills, photoUrl, about }} />
        </div>
      )}

      {/* RIGHT SIDE — Edit Form */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <div className="card bg-base-300 w-full max-w-md shadow-lg">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Edit Profile</h2>

            <fieldset className="fieldset text-base space-y-2">

              <legend className="fieldset-legend mt-2">First Name</legend>
              <input
                type="text"
                className="input w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <legend className="fieldset-legend mt-2">Last Name</legend>
              <input
                type="text"
                className="input w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <legend className="fieldset-legend mt-2">Photo URL</legend>
              <input
                type="text"
                className="input w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <legend className="fieldset-legend mt-2">About</legend>
              <input
                type="text"
                className="input w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <legend className="fieldset-legend mt-2">Age</legend>
              <input
                type="number"
                className="input w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <legend className="fieldset-legend mt-2">Gender</legend>
              <input
                type="text"
                className="input w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />

              <legend className="fieldset-legend mt-2">Skills</legend>
              <input
                type="text"
                className="input w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

            </fieldset>

            <div className="card-actions justify-center mt-4">
              <button className="bg-blue-600 text-white p-3 rounded-md w-full" onClick={updateProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
