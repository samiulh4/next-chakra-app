'use client'

import { useState, useRef } from 'react'
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue
} from '@chakra-ui/react'

export default function UploadVideo() {
  const [result, setResult] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const videoRef = useRef(null)
  const inputRef = useRef(null)

  const bgColor = useColorModeValue('#f4f4f4', '#2d3748')
  const textColor = useColorModeValue('#000', '#fff')

  /* ===============================
     RATIO LABEL MAP
  =============================== */
  const getRatioLabel = (ratio) => {
    const ratios = {
      '16:9': 'Widescreen',
      '9:16': 'Social Story',
      '1:1': 'Square',
      '4:5': 'Social Post',
      '3:4': 'Portrait',
      '4:3': 'Classic',
      '3:2': 'Standard Photo',
      '2:1': 'Cinematic',
      '1:2': 'Vertical'
    }
    return ratios[ratio] || 'Custom'
  }

  /* ===============================
     GCD (EUCLIDEAN ALGORITHM)
  =============================== */
  const greatestCommonDivisor = (num1, num2) => {
    let hcf = 1
    let sm = Math.min(num1, num2)
    for (let i = 1; i <= sm; i++) {
      if (num1 % i === 0 && num2 % i === 0) {
        hcf = i
      }
    }
    return hcf
  }

  /* ===============================
     PLATFORM STYLE RATIO MATCH
  =============================== */
  const detectStandardRatio = (width, height) => {
    const ratio = width / height
    const tolerance = 0.02 // Industry tolerance

    const standards = {
      '16:9': 16 / 9,
      '9:16': 9 / 16,
      '1:1': 1,
      '4:3': 4 / 3,
      '3:4': 3 / 4,
      '3:2': 3 / 2,
      '2:3': 2 / 3,
      '4:5': 4 / 5,
      '1:2': 1 / 2,
      '2:1': 2
    }

    for (const key in standards) {
      if (Math.abs(ratio - standards[key]) < tolerance) {
        return key
      }
    }
    return ratio.toFixed(4)
  }

  /* ===============================
     FILE INPUT HANDLER
  =============================== */
  const handleVideoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const videoURL = URL.createObjectURL(file)

    // Show preview
    setVideoPreview(videoURL)

    // Metadata reader
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = function () {
      const width = video.videoWidth
      const height = video.videoHeight

      // Exact Ratio (Math)
      const divisor = greatestCommonDivisor(width, height)
      const exactRatio = `${width / divisor}:${height / divisor}`
      const exactRatioLabel = getRatioLabel(exactRatio)

      // Platform Ratio
      const standardRatio = detectStandardRatio(width, height)
      const standardRatioLabel = getRatioLabel(standardRatio)

      // Update state
      setResult({
        resolution: `${width} × ${height}`,
        exactRatio,
        exactRatioLabel,
        standardRatio,
        standardRatioLabel
      })

      URL.revokeObjectURL(video.src)
    }

    video.src = videoURL
  }

  return (
    <VStack spacing={6} align="stretch" maxW="700px" mx="auto" py={8} px={6}>
      <Heading as="h2" size="lg">
        Upload Video to Detect Aspect Ratio
      </Heading>

      <Input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        cursor="pointer"
        p={2}
      />

      {videoPreview && (
        <Box as="video" 
          ref={videoRef}
          src={videoPreview}
          controls
          w="250px"
          h="250px"
          borderRadius="8px"
          bg="#000"
        />
      )}

      {result && (
        <Box
          bg={bgColor}
          p={6}
          borderRadius="8px"
          borderLeft="4px solid #3182ce"
        >
          <VStack align="start" spacing={4}>
            <Box>
              <Text fontWeight="bold" mb={1}>
                Resolution:
              </Text>
              <Text color={textColor}>{result.resolution}</Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="bold" mb={1}>
                Exact Ratio (GCD):
              </Text>
              <Text color={textColor}>
                {result.exactRatio} ({result.exactRatioLabel})
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="bold" mb={1}>
                Platform Ratio:
              </Text>
              <Text color={textColor}>
                {result.standardRatio} ({result.standardRatioLabel})
              </Text>
            </Box>
          </VStack>
        </Box>
      )}
    </VStack>
  )
}
