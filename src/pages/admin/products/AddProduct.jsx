import React, { useState, useEffect } from 'react'
import { auth, db, storage } from '../../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pricing, setPricing] = useState('');
    const [costPerItem, setCostPerItem] = useState('');
    const [quantity, setQuantity] = useState('');

    const [dropDownCollection, setDropDownCollection] = useState('')
    const [collections, setCollections] = useState([]);

    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFileNames, setImageFileNames] = useState([]);
    const [imageDetails, setImageDetails] = useState([]);
    const [product, setProduct] = useState({});


    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, 'products'), {
                name: title,
                description: description,
                pricing: pricing,
                costPerItem: costPerItem,
                inventory: quantity,
                status: 1,
                type: 'Merchandise',
                collection: dropDownCollection,
                images: imageFileNames,
            }).then(async (newProduct) => {

                async function uploadImage(image) {
                    const imageRef = ref(storage, `${newProduct.id}/${image.name}`);

                    const response = await uploadBytes(imageRef, image);
                    const url = await getDownloadURL(response.ref);
                    return url;
                }

                const imagePromises = Array.from(images, async (image) => { return ({url: await uploadImage(image), file_name:image.name})});
                const imageRes = await Promise.all(imagePromises);

                // SET URLS
                const imageDetailsRef = doc(db, 'products', `${newProduct.id}`);
                await updateDoc(imageDetailsRef, {
                    images: imageRes
                });

                navigate(`./../${newProduct.id}`);
            })

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getCollections = async () => {

            const docRef = collection(db, 'collections');
            const docSnap = await getDocs(docRef);

            const temp = []

            docSnap.forEach(snap => {
                temp.push({ ...snap.data(), id: snap.id });
            })

            setCollections(temp);
        }

        getCollections();
    }, [])

    const onSelectFile = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        setImages((prevImages) => prevImages.concat(selectedFilesArray));
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        })

        const imageFileNames = selectedFilesArray.map((file) => {
            return file.name;
        })

        setImageFileNames((prevImages) => prevImages.concat(imageFileNames));
        setSelectedImages((prevImages) => prevImages.concat(imagesArray));
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
                <div className="flex flex-row gap-4 items-center">
                    <button onClick={() => { navigate(-1) }} className="border border-accent-dark h-[30px] w-[30px] rounded-lg hover:bg-accent-default hover:text-white hover:font-bold hover:border-accent-default transition-all duration-100">{'<'}</button>
                    <p className='text-xl font-medium'>Add Product</p>
                </div>
                <button onClick={handleSubmit} className='bg-accent-default text-white py-2 px-3 rounded-md hover:bg-accent-light'>Save</button>
            </div>

            <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-5 flex-[2]">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <div className="flex flex-col">
                            <label htmlFor="title">Title</label>
                            <input onChange={(e) => { setTitle(e.target.value) }} type="text" name='title' id='title' className='border rounded-md p-1 px-2' />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={(e) => { setDescription(e.target.value) }} name="description" id="" cols="30" rows="4" className='resize-none border rounded-md p-1 px-2'></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p className='font-medium text-accent-default'>Media</p>

                        <div className="border rounded-md p-1 px-2 py-2 flex flex-row flex-wrap gap-2">
                            {
                                selectedImages &&
                                selectedImages.map((image, index) => {
                                    return (
                                        <div key={index} className='flex flex-col justify-center items-center w-[30%] border'>
                                            <img src={image} alt={'product'} onClick={() => setSelectedImages(selectedImages.filter((e) => e !== image))} className='object-contain' />
                                        </div>
                                    )
                                })
                            }
                            <div className='flex flex-col justify-center items-center min-h-[300px] w-[32.52%] border'>
                                <label htmlFor="images" className='w-full h-full flex items-center justify-center cursor-pointer'>
                                    Add Image
                                    <input type="file" name='images' id='images' onChange={onSelectFile} multiple accept={'image/png, image/jpeg, image/jpg, image/webp'} className='hidden' />
                                </label>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p className='font-medium text-accent-default'>Pricing</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <input onChange={(e) => { setPricing(e.target.value) }} type="number" name='price' id='price' className='border rounded-md p-1 px-2 w-fit' />
                        </div>

                        <hr />

                        <div className="flex flex-col">
                            <label htmlFor="cost-per-item">Cost per item</label>
                            <input onChange={(e) => { setCostPerItem(e.target.value) }} type="number" name='cost-per-item' id='cost-per-item' className='border rounded-md p-1 px-2 w-fit' />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 flex-1">
                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p className='font-medium text-accent-default'>Collections</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Add to collection</label>
                            <select name="collection" id="collection" className='border rounded-md p-1 px-2 w-full' onChange={(e) => { setDropDownCollection(e.target.value) }}>
                                <option value="none">None</option>
                                {collections.map((collection, index) => {
                                    return <option key={index} value={collection.id}>{collection.title}</option>
                                })}
                            </select>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 shadow-md p-5 bg-white rounded-md">
                        <p className='font-medium text-accent-default'>Inventory</p>

                        <div className="flex flex-col">
                            <label htmlFor="price">Quantity</label>
                            <input onChange={(e) => { setQuantity(e.target.value) }} type="number" name='price' id='price' className='border rounded-md p-1 px-2 w-full' />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AddProduct