import { View, StyleSheet, Image } from "react-native";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";

/* 
  El componente `ProductCard` recibe un Objeto de tipo Card

  Referencias:
  - https://www.youtube.com/watch?v=vunwBbFx_F8
*/

const SkeletonCommonProps = {
  colorMode: "light",
  transition: {
    type: "timing",
    duration: 2000,
  },
  backgroundColor: "#D4D4D4",
};

export default function ProductCard(props) {
  const { item } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.mainBox}>
      <Skeleton.Group show={!imageLoaded}>
        <View style={styles.box}>
          <Skeleton
            width={110}
            height={110}
            radius={"round"}
            {...SkeletonCommonProps}
          >
            <Image
              style={styles.image}
              source={{ uri: `${item.imageCover}` }}
              onLoad={() => setImageLoaded(true)}
            />
          </Skeleton>
          <View style={styles.infoContainer}>
            <Skeleton width={"100%"} height={18} {...SkeletonCommonProps}>
              {imageLoaded && (
                <StyledText extraSmall textAlign="left" numberOfLines={1}>
                  {item.name}
                </StyledText>
              )}
            </Skeleton>
            <Skeleton width={"90%"} height={18} {...SkeletonCommonProps}>
              {imageLoaded && (
                <StyledText hint normal numberOfLines={1}>
                  {item.numberOfColors}{" "}
                  {item.numberOfColors === 1 ? "Color" : "Colores"}
                </StyledText>
              )}
            </Skeleton>
            <Skeleton width={"80%"} height={18} {...SkeletonCommonProps}>
              {imageLoaded && (
                <StyledText extraSmall bold textAlign="left" numberOfLines={1}>
                  $ {item.price}
                </StyledText>
              )}
            </Skeleton>
          </View>
        </View>
      </Skeleton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    width: 150,
    height: 200,
    backgroundColor: theme.colors.bg.default,
    borderRadius: 14,
  },

  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    padding: 24,
  },

  infoContainer: {
    display: "flex",
    gap: 2,
    width: "100%",
  },

  image: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    transform: [{ rotate: "-14deg" }],
  },

  addToCartButton: {
    width: 30,
    height: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: theme.colors.bg.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
