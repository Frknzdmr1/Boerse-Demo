import React from "react";
import { Card, Box, Heading, Text } from "@chakra-ui/react";

const Überblick = ({ tickerDetails }) => {
    return (
        <Card p={4} boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Überblick
            </Text>
            {tickerDetails && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box>
                        <Heading as="h1" size="md">
                            <strong>{tickerDetails.market_cap}T</strong>
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                            Marketcap
                        </Text>
                    </Box>
                    <Box>
                        <Heading as="h1" size="md">
                            <strong>{tickerDetails.primary_exchange}</strong>
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                            Primary Exchange
                        </Text>
                    </Box>
                </Box>
            )}
        </Card>
    );
};

export default Überblick;
