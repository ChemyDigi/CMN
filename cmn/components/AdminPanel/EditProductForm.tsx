"use client";

import React, { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import axios from "axios";

type ExtraField = { id: string; name: string; value: string };

interface Props {
  product: any;
  onClose: () => void;
  onUpdated: () => void;
}

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cmn-products");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dwjhzcztk/image/upload",
    formData
  );

  return res.data.secure_url;
};

export default function EditProductForm({ product, onClose, onUpdated }: Props) {
  const [loading, setLoading] = useState(false);

  // Prefill values
  const [serialId, setSerialId] = useState(product.serialId);
  const [category, setCategory] = useState(product.category);
  const [productName, setProductName] = useState(product.productName);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [warranty, setWarranty] = useState(product.warranty);
  const [material, setMaterial] = useState(product.material);

  const [extraFields, setExtraFields] = useState<ExtraField[]>(product.extraFields || []);

  const [mainPreview, setMainPreview] = useState<string>(product.mainImage);
  const [subPreviews, setSubPreviews] = useState<string[]>(product.subImages || []);

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [subFiles, setSubFiles] = useState<File[]>([]);

  const mainRef = useRef<HTMLInputElement>(null);
  const subRef = useRef<HTMLInputElement>(null);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setMainFile(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleSubImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSubFiles(files);
      setSubPreviews(files.map((f) => URL.createObjectURL(f)));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let uploadedMain = product.mainImage;
      let uploadedSubs = product.subImages;

      // Upload main image only if changed
      if (mainFile) {
        uploadedMain = await uploadToCloudinary(mainFile);
      }

      // Upload sub images only if changed
      if (subFiles.length > 0) {
        uploadedSubs = [];
        for (const f of subFiles) {
          const url = await uploadToCloudinary(f);
          uploadedSubs.push(url);
        }
      }

      const collectionName = product.type === "tool" ? "tools" : "AC-Ref";

      await updateDoc(doc(db, collectionName, product.id), {
        serialId,
        category,
        productName,
        brand,
        description,
        warranty,
        material,
        extraFields,
        mainImage: uploadedMain,
        subImages: uploadedSubs,
      });

      toast.success("Product updated successfully");
      onUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">

        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded"
            value={serialId} placeholder="Serial ID"
            onChange={(e) => setSerialId(e.target.value)} />

          <input className="border p-2 rounded"
            value={productName} placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)} />

          <input className="border p-2 rounded"
            value={category} placeholder="Category"
            onChange={(e) => setCategory(e.target.value)} />

          <input className="border p-2 rounded"
            value={brand} placeholder="Brand"
            onChange={(e) => setBrand(e.target.value)} />

          <input className="border p-2 rounded"
            value={warranty} placeholder="Warranty"
            onChange={(e) => setWarranty(e.target.value)} />

          <input className="border p-2 rounded"
            value={material} placeholder="Material"
            onChange={(e) => setMaterial(e.target.value)} />
        </div>

        {/* Description */}
        <textarea
          className="border p-2 rounded w-full mt-3"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        {/* Extra Fields */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Extra Fields</h3>
          {extraFields.map((f, i) => (
            <div key={f.id} className="flex gap-2 mb-2">
              <input
                className="border p-2 w-1/3 rounded"
                value={f.name}
                onChange={(e) => {
                  const updated = [...extraFields];
                  updated[i].name = e.target.value;
                  setExtraFields(updated);
                }}
              />
              <input
                className="border p-2 w-2/3 rounded"
                value={f.value}
                onChange={(e) => {
                  const updated = [...extraFields];
                  updated[i].value = e.target.value;
                  setExtraFields(updated);
                }}
              />
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm font-semibold mb-1">Main Image</p>
            <img src={mainPreview} className="w-full h-40 object-cover rounded"/>
            <input type="file" ref={mainRef} className="hidden" onChange={handleMainImageChange}/>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded" onClick={() => mainRef.current?.click()}>Change</button>
          </div>

          <div>
            <p className="text-sm font-semibold mb-1">Sub Images</p>
            <div className="grid grid-cols-3 gap-2">
              {subPreviews.map((img, idx) => (
                <img key={idx} src={img} className="h-20 w-full rounded object-cover"/>
              ))}
            </div>
            <input type="file" ref={subRef} className="hidden" multiple onChange={handleSubImageChange}/>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded" onClick={() => subRef.current?.click()}>Change</button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 bg-gray-200 rounded">Cancel</button>

          <button
            disabled={loading}
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
