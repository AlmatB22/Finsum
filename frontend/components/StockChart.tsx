import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface StockChartProps {
    data: { value: number; label?: string }[];
    color?: string;
}

export default function StockChart({ data, color = '#4F46E5' }: StockChartProps) {
    const screenWidth = Dimensions.get('window').width;

    if (!data || data.length === 0) {
        return (
            <View className="h-64 items-center justify-center bg-gray-50 rounded-2xl">
                <Text className="text-gray-400">No chart data available</Text>
            </View>
        );
    }

    return (
        <View className="items-center justify-center bg-white rounded-3xl py-4 shadow-sm border border-gray-100">
            <LineChart
                data={data}
                width={screenWidth - 60}
                height={220}
                color={color}
                thickness={3}
                hideDataPoints
                hideRules
                hideYAxisText
                hideAxesAndRules
                curved
                adjustToWidth
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: false,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                        return (
                            <View
                                style={{
                                    height: 90,
                                    width: 100,
                                    justifyContent: 'center',
                                    marginTop: -30,
                                    marginLeft: -40,
                                }}
                            >
                                <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'black' }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                                        {'$' + items[0].value}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            {/* Time Range Selector - Visual Only */}
            <View className="flex-row justify-between w-full px-8 mt-4">
                {['1D', '1M', '3M', '6M', '1Y', 'MAX'].map((period) => (
                    <View key={period} className={`px-3 py-1 rounded-full ${period === '1M' ? 'bg-gray-200' : ''}`}>
                        <Text className={`text-xs font-semibold ${period === '1M' ? 'text-black' : 'text-gray-400'}`}>{period}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
