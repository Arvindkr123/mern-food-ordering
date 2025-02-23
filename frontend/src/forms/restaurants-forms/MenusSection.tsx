import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import MenuItemInput from "./MenuItemInput"
import { useFieldArray, useFormContext } from 'react-hook-form'

const MenusSection = () => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menusItems"
    })

    return (
        <div className='space-y-2'>
            <div className="">
                <h2 className='text-2xl font-bold'>Menu</h2>
                <FormDescription>Create your menu and give each item a name and price </FormDescription>
            </div>
            <FormField
                control={control}
                name='menuItems'
                render={() => (
                    <FormItem className='flex flex-col gap-2'>
                        {
                            fields.map((_, index:number) => {
                                return <MenuItemInput
                                    index={index}
                                    removeMenuItem={() => remove(index)}
                                />
                            })
                        }
                    </FormItem>
                )}
            />

            <Button type='button' onClick={() => append({ name: '', price: "" })}>Add Menu Item</Button>


        </div>
    )
}

export default MenusSection