import { View, Text, ScrollView, ActivityIndicator, Pressable, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import StockChart from '@/components/StockChart';
import { useStockDetails } from '@/hooks/useStockDetails';

export default function StockDetails() {
  const { symbol } = useLocalSearchParams();
  const router = useRouter();
  const { stock, loading, error } = useStockDetails(typeof symbol === 'string' ? symbol : undefined);

  const handleGoBack = () => {
    // Navigate back immediately - reverse animation will play on home screen
    router.back();
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <Text key={index} className="font-bold text-gray-800">{part.slice(2, -2)}</Text>;
      }
      return <Text key={index} className="text-gray-600">{part}</Text>;
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  if (error || !stock) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error || 'Stock not found'}</Text>
        <Pressable onPress={handleGoBack} className="mt-4 p-2 bg-gray-100 rounded-lg">
          <Text>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-2">
          <Pressable onPress={handleGoBack} className="p-2">
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <View className="items-center">
            <Text className="text-xl font-bold">{stock.symbol}</Text>
            <Text className="text-sm text-gray-500">{stock.name}</Text>
          </View>
          <Pressable className="p-2">
            <Feather name="heart" size={24} color="gray" />
          </Pressable>
        </View>

        {/* Price Section */}
        <View className="px-6 mt-4">
          <Text className="text-4xl font-bold">${stock.price.toFixed(2)}</Text>
          <Text className={`text-lg font-medium mt-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.percent_change.toFixed(2)}%)
          </Text>
        </View>

        {/* Chart Section */}
        <View className="mt-6 px-4">
          <StockChart data={stock.chart_data} color={stock.change >= 0 ? '#4F46E5' : '#EF4444'} />
        </View>

        {/* What's Happening Section */}
        <View className="px-6 mt-8">
          <Text className="text-xl font-bold mb-4 text-gray-800">What's happening</Text>
          <View className="space-y-4">
            {stock.insights.map((insight, index) => (
              <View key={index} className="flex-row">
                <Text className="text-gray-400 mr-2">•</Text>
                <Text className="flex-1 text-base leading-6">
                  {renderFormattedText(insight)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* News Cards Section */}
        <View className="mt-8 mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
            {stock.news.map((item, index) => (
              <View key={index} className="w-64 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <Image source={{ uri: item.image }} className="w-full h-32" resizeMode="cover" />
                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <Image source={{ uri: 'https://logo.clearbit.com/' + item.source.toLowerCase() + '.com' }} className="w-4 h-4 rounded-full mr-2" />
                    {/* Fallback logic for logo or just text if image fails is tricky in RN without handling onError, keeping simple for now */}
                    <Text className="text-xs font-bold text-gray-500 uppercase">{item.source}</Text>
                  </View>
                  <Text className="text-sm font-semibold text-gray-800 leading-5" numberOfLines={3}>{item.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
