import axios from 'axios';
import React, { useState } from 'react'
import { URI } from '../connection/boot';

export const UpdatePassword = () => {
        const [formData, setFormData] = useState({
                email: '',
                password: '',
                confirmPassword: '',
                showPassword: false,
              });
        const[resetDetails,setResetDetails] =useState({
          email: '',
          password: '',
        })
        const handleChange = (e)=>{
                const {name,value} = e.target;
                setFormData({...formData, [name]: value});
        }
            
        const togglePasswordVisibility = () => {
                setFormData({ ...formData, showPassword: !formData.showPassword });
        };


        const handleFormSubmit = async (e) => {
          e.preventDefault()
          console.log(formData);
            if(formData.password !== formData.confirmPassword){
              window.alert("Password is not matching ")
              setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                showPassword: false,
              })
            }
            else{
              setResetDetails(formData.email, formData.password)
              try{
                const response = await axios.post(URI+"/reset",resetDetails)
                console.log(response)
              }catch(error){console.log(error)}
            }

        }



  return (
        <div className="flex justify-center items-center h-screen bg-[#020014e7]">
        <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleFormSubmit}>
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>
  )
}
