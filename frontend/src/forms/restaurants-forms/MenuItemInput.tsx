import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

type MenuItemInputProps = {
    index: number;
    removeMenuItem: () => void;
}
const MenuItemInput = ({ index, removeMenuItem }: MenuItemInputProps) => {

    const { control } = useFormContext();


    return (
        <div className='flex flex-row items-end gap-2'>
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field }) => (
                    <FormItem className='flex items-center gap-1'>
                        <FormLabel>
                            Name
                            <FormMessage></FormMessage>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Cheese Pizza ' className='bg-white' />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({ field }) => (
                    <FormItem className='flex items-center gap-1'>
                        <FormLabel>
                            Price (RS)
                            <FormMessage></FormMessage>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='30.00' className='bg-white' />
                        </FormControl>
                    </FormItem>
                )}
            />

            <Button className='bg-red-500 max-h-fit' type='button' onClick={removeMenuItem}>Remove</Button>
        </div>
    )
}

export default MenuItemInput