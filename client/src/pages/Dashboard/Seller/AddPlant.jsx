import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utils'

const AddPlant = () => {
  const {user} = useAuth
  const handleSubmit = async e =>{
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageUrl = await imageUpload(image)

    // seller info
    const seller = {
      
    }

  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit}/>
    </div>
  )
}

export default AddPlant
