import { View, TextInput, Pressable, FlatList, Text, ActivityIndicator, Keyboard } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stock } from '@/types/stock';
import { useRouter } from 'expo-router';

interface SearchParams {
    value: string;
    onValueChange: (value: string) => void;
    results?: Stock[];
    onFocus?: () => void;
    onBlur?: () => void;
    isLoading?: boolean;
}

export default function SearchBar({ value, onValueChange, results = [], onFocus, onBlur, isLoading = false }: SearchParams) {
    const router = useRouter();

    return (
        <View className="z-50">
            <View className="flex-row bg-white h-14 px-4 border border-[#DDDDDD] rounded-full items-center">
                <Feather name="search" size={24} color="black" />
                <TextInput
                    className="ml-2 flex-1 h-full text-[16px]"
                    placeholder="Search Stocks..."
                    placeholderTextColor="#000000AD"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onValueChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {isLoading ? (
                    <ActivityIndicator size="small" color="#000000" className="ml-2" />
                ) : value !== '' && (
                    <Pressable onPress={() => onValueChange('')} className="ml-2 p-1">
                        <MaterialIcons name="cancel" size={24} color="black" />
                    </Pressable>
                )}
            </View>
            {value !== '' && results.length > 0 && !isLoading && (
                <View className="absolute top-16 left-0 right-0 bg-white border border-[#DDDDDD] rounded-2xl shadow-lg max-h-60 overflow-hidden">
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.symbol}
                        renderItem={({ item }) => (
                            <Pressable
                                className="px-4 py-3 border-b border-[#F0F0F0] active:bg-gray-100"
                                onPress={() => {
                                    Keyboard.dismiss();
                                    onValueChange('');
                                    router.navigate(`/stock/${item.symbol}`);
                                    // Optional: Navigate or do something else
                                }}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="font-bold text-base">{item.symbol}</Text>
                                        <Text className="text-gray-500 text-sm">{item.name}</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="font-semibold">${item.price.toFixed(2)}</Text>
                                        <Text className={item.change >= 0 ? "text-green-600 text-xs" : "text-red-600 text-xs"}>
                                            {item.change > 0 ? '+' : ''}{item.change.toFixed(2)} ({item.percent.toFixed(2)}%)
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                        keyboardShouldPersistTaps="handled"
                        initialNumToRender={5}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                </View>
            )}
        </View>
    );
}
