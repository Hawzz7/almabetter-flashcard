import React from "react";
import { FieldArray, Formik, Form } from "formik";
import MyInput from "./form-components/MyInput";
import MyTextarea from "./form-components/MyTextarea";
import UploadImage from "./form-components/UploadImage";
import TermInput from "./form-components/TermInput";
import TermTextarea from "./form-components/TermTextarea";
import AddIcon from "@mui/icons-material/Add";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setValuesOfCard } from "../store/Slice";
import { v4 as uuidv4 } from "uuid";

const CreateFlashcardPage = () => {
  const initialValues = {
    groupId: uuidv4(),
    groupName: "",
    groupDescription: "",
    image: null,
    array: [
      {
        termId: uuidv4(),
        termName: "",
        termDefination: "",
        termImage: null,
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    groupName: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Use 5 characters or more for your group name!"),
    groupDescription: Yup.string()
      .min(20, "Too Short!")
      .required("Use 20 characters or more for group description!"),
    image: Yup.mixed().required("Please choose an image file"),

    array: Yup.array().of(
      Yup.object().shape({
        termName: Yup.string()
          .min(3, "Too Short!")
          .required("Use 3 characters or more for term name!"),
        termDefination: Yup.string()
          .min(10, "Too Short!")
          .required("Use 10 characters or more to define the term!"),
        termImage: Yup.mixed().required("Please choose an image file"),
      })
    ),
  });

  const data = useSelector((state) => {
    return state.cards.valuesOfCard;
  });

  const existingGroupIds = data.map((card) => card.card.groupId);

  const dispatch = useDispatch();

  const onSubmit = (values, { resetForm }) => {

    // Check for local duplicates
    let newGroupId = values.groupId;
    while (existingGroupIds.includes(newGroupId)) {
      newGroupId = uuidv4(); // Generate a new groupId if it already exists locally
    }

    // Check for global duplicates (within Redux store)
    while (existingGroupIds.includes(newGroupId)) {
      newGroupId = uuidv4(); // Generate a new groupId if it already exists globally
    }

    // Update the values with the new groupId
    values.groupId = newGroupId;
    
    dispatch(setValuesOfCard(values));
    resetForm({ values: "" });
    console.log(values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="flex items-center justify-center w-full min-h-full">
            <Form className="flex flex-col w-full px-4 space-y-4 h-fit sm:w-[635px] md:w-[740px] lg:w-[900px]">
              <div className="flex flex-col gap-2 p-4 bg-yellow-300 border-none rounded-lg">
                <div className="gap-10 space-y-3 sm:flex">
                  <MyInput
                    label="Create Group"
                    name="groupName"
                    type="text"
                    placeholder="Enter group name"
                  />

                  <UploadImage label="Upload Image" name="image" />
                </div>
                <MyTextarea
                  label="Group Description"
                  name="groupDescription"
                  type="text"
                  placeholder="Describe the roles, resposibility, skilss required for the job and help candidate to understand the role better."
                  rows="5"
                />
              </div>

              <div className="flex flex-col gap-2 p-4 bg-yellow-300 border-none rounded-lg">
                <FieldArray
                  name="array"
                  render={(arrayHelpers) => {
                    return (
                      <div>
                        {formik.values.array.map((terms, index) => (
                          <div key={index}>
                            <div
                              className="flex h-[25px] w-[25px] text-white justify-center
                            items-center bg-red-500 rounded-xl"
                            >
                              {index + 1}
                            </div>

                            <div className="items-center gap-4 sm:flex justify-stretch ">
                              <TermInput
                                label="Enter Term"
                                name={`array[${index}].termName`}
                                type="text"
                                placeholder="Enter term name"
                              />
                              <TermTextarea
                                label="Enter Defination"
                                name={`array[${index}].termDefination`}
                                type="text"
                                placeholder="Describe the term."
                                rows="2"
                              />
                              <UploadImage
                                label="Upload Image"
                                name={`array[${index}.termImage`}
                              />

                              <div>
                                {index > 0 && (
                                  <div className="flex items-center justify-center gap-4 mt-6 sm:flex-col">
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteSweepIcon />
                                    </button>

                                    <button type="button">
                                      <EditIcon />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div>
                          <button
                            className="font-medium text-blue-600"
                            type="button"
                            onClick={() =>
                              arrayHelpers.insert(formik.values.length + 1, {
                                termId: uuidv4(),
                                termName: "",
                                termDefination: "",
                                termImage: null,
                              })
                            }
                          >
                            <AddIcon />
                            Add Another Term
                          </button>
                        </div>
                      </div>
                    );
                  }}
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="text-white rounded-[4px] font-semibold bg-red-600 hover:bg-red-800 w-[180px] py-[4px] hover:scale-105 duration-[250ms]"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default CreateFlashcardPage;
