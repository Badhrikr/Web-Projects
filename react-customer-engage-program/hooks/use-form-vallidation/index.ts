import { useState } from "react";
import { FormValidation, PatchValue } from "./model";

function useFormValidation(form: Record<string, FormValidation>) {
    const [group, setGroup] = useState<Record<string, FormValidation>>(form);

    const set = ({ id, value }: PatchValue) => {
        const updatedItem = { ...group[id], value };

        setGroup({
            ...group,
            [id]: { ...validate(id, updatedItem) }
        });
    }

    const get = (id: string) => {
        return group[id];
    }

    const setError = ({ id, message, hasError }: any) => {
        setGroup((prevGroup) => {
            return {
                ...prevGroup,
                [id]: { ...prevGroup[id], hasError, errorMessage: message }
            }
        });
    }

    const validate = (id: string, props: FormValidation): FormValidation => {
        const { value, pattern } = props;

        if (pattern && String(value).length > 0 && !pattern?.test(String(value))) {
            return { ...props, hasError: true, errorMessage: form[id].errorMessage }
        }

        return { ...props, value: String(value).trim(), hasError: false };
    }

    const checkRequiredFields = (): boolean => {
        let hasError = false;

        for (const field in group) {
            if (
                get(field)?.required &&
                (!get(field).value || String(get(field).value).length === 0)
            ) {
                setError({ id: field, message: "Required Field", hasError: true });
                hasError = true;
            } else if (get(field).hasError) {
                hasError = true;
            } else {
                setError({ id: field, message: "", hasError: false });
            }
        }
        return hasError === false;
    }

    return { form: { group, set, get, setError, checkRequiredFields } }
}

export default useFormValidation;