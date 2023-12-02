import React, { useEffect, useState } from 'react'
import { PageSpinner, PageTitle, PrimaryButton } from '../../components'
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
import { BAR_COLOR, BAR_WIDTH } from '../../constants/BAR_CHART.constants'
import { useNavigate } from 'react-router-dom'
import { getAdminDetails, updateAdminDetails } from '../../apis/admin.api'

const index = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [admin, setAdmin] = useState({
    name: '',
    location: '',
    charge_customers: false,
    display_amount: false,
    amount: {},
    hosts: []
  })

  const isInputDisabled = !admin.charge_customers

  const isSaveBtnDisabled = () => {
    if (admin.amount.category_6 > 99 && admin.amount.category_7 > 79 && admin.amount.category_8 > 59 && admin.amount.category_9 > 39 && admin.amount.category_10 > 19) {
      return false
    }
    else
      return true
  }

  const handleFormChange = (e) => {
    const label = e.target.name
    const value = e.target.value

    setIsButtonDisabled(false)

    if (String(label).includes('category')) {
      setAdmin({ ...admin, amount: { ...admin.amount, [label]: Number(value) } })
    }
    else if (String(label).toLowerCase() === 'charge_customers' && value === 'true') {
      setAdmin({ ...admin, charge_customers: true })
    }
    else if (String(label).toLowerCase() === 'charge_customers' && value === 'false') {
      setAdmin({ ...admin, charge_customers: false })
    }
    else {
      setAdmin({ ...admin, [label]: value })
    }
  }

  const getBarData = () => {
    let barData = []

    for (const [key, value] of Object.entries(admin.amount)) {
      barData.push({ label: key, amount: value })
    }

    return barData
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsButtonDisabled(false)

    const payload = {
      amount: {
        category_6: admin.amount.category_6,
        category_7: admin.amount.category_7,
        category_8: admin.amount.category_8,
        category_9: admin.amount.category_9,
        category_10: admin.amount.category_10
      }
    }

    const response = await updateAdminDetails(payload)

    if (response !== "Error") {
      setIsButtonDisabled(true)
    }

  }

  useEffect(() => {
    const adminId = localStorage.getItem('id')

    const getAdmin = async () => {
      if (adminId) {
        const response = await getAdminDetails(adminId)
        if (response !== 'Error') {
          const { name, charge_customers, amount, display_amount, location, hosts } = response

          setAdmin({
            name,
            location,
            charge_customers,
            amount,
            display_amount,
            hosts
          })
        }

        setIsLoading(false)
      }
      else {
        navigate('/login')
      }
    }

    getAdmin()
  }, [])

  if (!isLoading) {
    return (
      <div className='min-h-screen justify-center text-center flex flex-col gap-24'>
        <PageTitle
          title={`${admin.name}, ${admin.location} on Dhun Jam`}
        />

        <form method='POST' onSubmit={handleSubmit} className='w-[600px] mx-auto flex flex-col gap-16'>
          <div className='flex flex-col gap-14'>
            <div className='flex items-center'>
              <h4 className='text-start w-1/2'>Do you want to charge your customers for requesting songs?</h4>
              <div className='flex gap-10 justify-center w-1/2'>
                <div className='flex items-center gap-1'>
                  <input
                    type='radio'
                    name='charge_customers'
                    defaultChecked={admin?.charge_customers}
                    onClick={handleFormChange}
                    className='accent-radio'
                    value={true}
                  />
                  <h4>Yes</h4>
                </div>
                <div className='flex items-center gap-1'>
                  <input
                    type='radio'
                    name='charge_customers'
                    defaultChecked={!admin?.charge_customers}
                    onClick={handleFormChange}
                    className='accent-radio'
                    value={false}
                  />
                  <h4>No</h4>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-32'>
              <h4 className='text-start w-1/2'>Custom song request amount-</h4>
              <input
                disabled={isInputDisabled}
                type='number'
                placeholder='99'
                min={99}
                name='category_6'
                defaultValue={admin.amount?.category_6}
                className='px-2 py-3 disabled:bg-disabled disabled:text-gray-700 text-center rounded-xl bg-transparent border border-white'
                onChange={handleFormChange}
              />
            </div>
            <div className='flex items-center gap-32'>
              <h4 className='text-start w-1/2'>Regular song request amounts, from high to low-</h4>
              <div className='flex justify-end gap-2 w-1/2'>
                <input
                  disabled={isInputDisabled}
                  type='number'
                  min={79}
                  name='category_7'
                  defaultValue={admin.amount?.category_7}
                  placeholder='79'
                  className='px-2 py-3 disabled:bg-disabled disabled:text-gray-700 text-center w-1/2 rounded-xl bg-transparent border border-white'
                  onChange={handleFormChange}
                />
                <input
                  disabled={isInputDisabled}
                  type='number'
                  min={59}
                  name='category_8'
                  defaultValue={admin.amount?.category_8}
                  placeholder='59'
                  className='px-2 py-3 disabled:bg-disabled disabled:text-gray-700 text-center w-1/2 rounded-xl bg-transparent border border-white'
                  onChange={handleFormChange}
                />
                <input
                  disabled={isInputDisabled}
                  type='number'
                  min={39}
                  name='category_9'
                  defaultValue={admin.amount?.category_9}
                  placeholder='39'
                  className='px-2 py-3 disabled:bg-disabled disabled:text-gray-700 text-center w-1/2 rounded-xl bg-transparent border border-white'
                  onChange={handleFormChange}
                />
                <input
                  disabled={isInputDisabled}
                  type='number'
                  min={19}
                  name='category_10'
                  defaultValue={admin.amount?.category_10}
                  placeholder='19'
                  className='px-2 py-3 disabled:bg-disabled disabled:text-gray-700 text-center w-1/2 rounded-xl bg-transparent border border-white'
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>

          {
            !isInputDisabled && <div className='relative'>
              <h2 className='absolute text-4xl'>&#8377;</h2>
              <BarChart
                height={350}
                width={620}
                layout='horizontal'
                barSize={BAR_WIDTH}
                data={getBarData()}
              >
                <XAxis dataKey="label" />
                <YAxis tick={() => null} />
                <Tooltip />
                <Bar dataKey="amount" fill={BAR_COLOR} />
              </BarChart>
            </div>
          }
          <PrimaryButton
            disabled={isSaveBtnDisabled() || isButtonDisabled}
            title='Save'
            className={'disabled:text-gray-700'}
            type='submit'
          />
        </form>
      </div>
    )
  }

  return <PageSpinner />
}

export default index