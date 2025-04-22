// import { View, Text } from "react-native";
// import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

// // Define the ToastConfig object with proper types
// const CustomToastConfig: ToastConfig = {
//   success: ({ text1, text2 }: ToastConfigParams<{}>) => (
//     <View className="w-[90%] flex-row items-center bg-emerald-500 rounded-xl p-4 shadow-xl backdrop-blur-lg">
//       <View className="w-10 h-10 items-center justify-center bg-emerald-400/50 rounded-xl mr-3 border border-emerald-400/20">
//         <Text className="text-white text-xl">✓</Text>
//       </View>
//       <View className="flex-1">
//         <Text className="text-white font-medium text-base tracking-wide">
//           {text1}
//         </Text>
//         {text2 && (
//           <Text className="text-white/80 mt-0.5 text-sm font-light">
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   ),

//   error: ({ text1, text2 }: ToastConfigParams<{}>) => (
//     <View className="w-[90%] flex-row items-center bg-rose-500 rounded-xl p-4 shadow-xl backdrop-blur-lg">
//       <View className="w-10 h-10 items-center justify-center bg-rose-400/50 rounded-xl mr-3 border border-rose-400/20">
//         <Text className="text-white text-xl">✕</Text>
//       </View>
//       <View className="flex-1">
//         <Text className="text-white font-medium text-base tracking-wide">
//           {text1}
//         </Text>
//         {text2 && (
//           <Text className="text-white/80 mt-0.5 text-sm font-light">
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   ),

//   info: ({ text1, text2 }: ToastConfigParams<{}>) => (
//     <View className="w-[90%] flex-row items-center bg-[#cbd5e1] rounded-xl p-4 shadow-xl">
//       <View className="w-10 h-10 items-center justify-center bg-[#94a3b8] rounded-xl mr-3 border border-[#cbd5e1]">
//         <Text className="text-black text-xl">ℹ</Text>
//       </View>
//       <View className="flex-1">
//         <Text className="text-black font-medium text-base tracking-wide">
//           {text1}
//         </Text>
//         {text2 && (
//           <Text className="text-black/70 mt-0.5 text-sm font-light">
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   ),

//   warning: ({ text1, text2 }: ToastConfigParams<{}>) => (
//     <View className="w-[90%] flex-row items-center bg-[#fde68a] rounded-xl p-4 shadow-xl">
//       <View className="w-10 h-10 items-center justify-center bg-[#fcd34d] rounded-xl mr-3 border border-[#fde68a]">
//         <Text className="text-black text-xl">⚠</Text>
//       </View>
//       <View className="flex-1">
//         <Text className="text-black font-medium text-base tracking-wide">
//           {text1}
//         </Text>
//         {text2 && (
//           <Text className="text-black/70 mt-0.5 text-sm font-light">
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   ),
// };

// export default CustomToastConfig;
