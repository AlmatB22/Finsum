import { View, TextInput, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef } from 'react';

interface SearchParams {
    value: string;
    onValueChange: (value: string) => void;
}

export default function SearchBar({ value, onValueChange }: SearchParams) {
    const inputRef = useRef<TextInput>(null);

    const handleClear = () => {
        onValueChange('');
    };

    return (
        <View className="flex-row bg-white h-14 px-4 border border-[#DDDDDD] rounded-full items-center">
            <Feather name="search" size={24} color="black" />
            <TextInput
                ref={inputRef}
                className="ml-2 flex-1 h-full text-[16px]"
                placeholder="Search Stocks..."
                placeholderTextColor="#000000AD"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onValueChange}
            />
            {value !== '' && (
                <Pressable onPress={handleClear} className="ml-2 p-1">
                    <MaterialIcons name="cancel" size={24} color="black" />
                </Pressable>
            )}
        </View>
    );
}
