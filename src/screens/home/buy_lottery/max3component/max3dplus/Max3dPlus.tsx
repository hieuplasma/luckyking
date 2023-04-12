import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ViewAbove } from "../../component/ViewAbove";

interface Props {
    showBottomSheet: boolean
}

export const Max3dPlusTab = React.memo((props: Props) => {

    const listDraw = useSelector((state: any) => state.drawReducer.max3dListDraw)

    const [typePlay, setType]: any = useState({ label: "Cơ bản", value: 1 });
    const [drawSelected, setDraw]: any = useState(listDraw[0])
    // const [numberSet, setNumbers]: any = useState(initNumber)

    // ref
    const chooseTypeRef: any = useRef(null);
    const chooseDrawRef: any = useRef(null);
    const chooseNumberRef: any = useRef(null);
    const [pageNumber, setPageNumber] = useState(0)

    const openTypeSheet = useCallback(() => { chooseTypeRef.current?.openSheet() }, [chooseTypeRef])

    const openDrawSheet = useCallback(() => { chooseDrawRef.current?.openSheet() }, [chooseDrawRef])

    return (
        <View style={{ flex: 1 }}>
            <ViewAbove typePlay={typePlay} drawSelected={drawSelected} openTypeSheet={openTypeSheet} openDrawSheet={openDrawSheet} />

            {/* BottomSheet */}
            {props.showBottomSheet ?
                <>
                    {/* {renderTypeSheet()}
                    {renderDrawSheet()}
                    {renderNumberSheet()} */}
                </> : <></>}
        </View>
    )
})