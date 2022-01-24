import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import AuthContext from '../contexts'
import * as Yup from 'yup'
import shippingMethod from '../constants/shippingMethod'
import { cities, district } from '../constants/cities'
import { getAllCategories, getPost, addPost, updatePost } from '../WebAPI'

export default function usePost() {
  const { faceToFace, sevenEleven, familyMart } = shippingMethod
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const { id: postId } = useParams()
  const [initialValues, setInitialValues] = useState({
    itemName: '',
    categoryId: '',
    description: '',
    itemStatus: '',
    tradingOptions: [],
    region: '',
    district: '',
  })
  const [categoryOptions, setCategoryOptions] = useState([])
  const statusOptions = [
    { key: '全新', value: '全新' },
    { key: '二手', value: '二手' },
  ]
  const shippingOptions = [
    { key: sevenEleven, value: '7-11' },
    { key: familyMart, value: '全家' },
    { key: faceToFace, value: '面交' },
  ]
  const regionOptions = cities
  const [districtOptions, setDistrictOptions] = useState([])
  const [images, setImages] = useState([])
  const DefaultPostImg = 'https://imgur.com/'
  const acceptImagesType = ['jpg', 'gif', 'png']
  const maxImagesNumber = 10
  const maxFileSize = 10485760 // 單位：Byte
  const [imageErrorMessage, setImageErrorMessage] = useState(null)
  const validationSchema = Yup.object({
    itemName: Yup.string().required('此欄位為必填'),
    categoryId: Yup.string().required('此欄位為必填'),
    itemStatus: Yup.string().required('此欄位為必填'),
    description: Yup.string().required('此欄位為必填'),
    tradingOptions: Yup.array().min(1, '請選擇至少一種交易方式'),
    region: Yup.string().when('tradingOptions', (tradingOptions, schema) => {
      try {
        if (tradingOptions.includes('面交')) {
          return Yup.string().required('請選擇面交縣市')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
    district: Yup.string().when('tradingOptions', (tradingOptions, schema) => {
      try {
        if (tradingOptions.includes('面交')) {
          return Yup.string().required('請選擇面交鄉鎮(市)區')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getAllCategories()
      setCategoryOptions(
        data.categories.map(({ categoryName: key, id: value }) => ({
          key,
          value,
        }))
      )
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchPost = async (id) => {
      const {
        data: {
          post: {
            author,
            itemName,
            category: { _id: categoryId },
            description,
            itemStatus,
            tradingOptions: { selectedMethods, faceToFace },
            imgUrls,
          },
        },
      } = await getPost(id)

      if (author._id !== user.id) {
        history.push('/givings')
        return
      }

      setInitialValues({
        itemName,
        categoryId,
        description,
        itemStatus,
        tradingOptions: selectedMethods,
        region: (faceToFace && faceToFace.region) || '',
        district: (faceToFace && faceToFace.district) || '',
      })
      setDistrictOptions((faceToFace && [district[faceToFace.region]][0]) || [])
      if (imgUrls[0].imgUrl === DefaultPostImg) return
      setImages(imgUrls)
    }

    if (!user) {
      history.push('/login')
      return
    }
    if (!postId) return
    fetchPost(postId)
  }, [history, postId, user])

  const handleImagesChange = (imageList) => {
    setImageErrorMessage(null)
    setImages(imageList)
  }

  const handleImagesError = (errors) => {
    if (errors.acceptType) {
      setImageErrorMessage(
        `格式錯誤，支援的檔案格式為 ${acceptImagesType.join(', ')}`
      )
      return
    }

    if (errors.maxNumber) {
      setImageErrorMessage(`超過數量上限，最多上傳 ${maxImagesNumber} 張圖片`)
      return
    }

    if (errors.maxFileSize) {
      setImageErrorMessage('超過檔案大小限制，最大檔案大小為 10 MB')
    }
  }

  const handleSubmit = (values) => {
    let postData = new FormData()
    for (let i = 0; i < images.length; i++) {
      if (images[i].file) {
        postData.append('imgUrl', images[i].file, images[i].file.name)
      } else {
        postData.append('imgUrl', images[i].imgUrl)
      }
    }
    for (const key in values) {
      postData.append(`${key}`, values[key])
    }

    if (!postId) {
      addPost(postData).then((res) => {
        if (res.data.message === 'success') {
          history.push(`/givings/${res.data.new.id}`)
        }
      })
      return
    }

    postData.append('postId', postId)
    updatePost(postId, postData).then((res) => {
      if (res.data.message === 'success') {
        history.push(`/givings/${postId}`)
      }
    })
  }

  return {
    postId,
    initialValues,
    validationSchema,
    categoryOptions,
    statusOptions,
    shippingOptions,
    regionOptions,
    districtOptions,
    setDistrictOptions,
    images,
    acceptImagesType,
    maxImagesNumber,
    maxFileSize,
    imageErrorMessage,
    handleImagesChange,
    handleImagesError,
    handleSubmit,
  }
}