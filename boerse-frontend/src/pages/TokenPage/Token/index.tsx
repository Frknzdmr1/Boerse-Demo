import React from "react";
import { Card, Box, Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const SingleToken = ({ tickerDetails }) => {
    return (
        <Card p={4} boxShadow="md">
            {tickerDetails && (
                <Box>
                    <Heading as="h1" size="lg" mb={6}>
                        Über {tickerDetails.name} ({tickerDetails.ticker})
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                        {tickerDetails.description}
                    </Text>
                </Box>
            )}
        </Card>
    );
};

SingleToken.propTypes = {
    tickerDetails: PropTypes.shape({
        name: PropTypes.string.isRequired,
        ticker: PropTypes.string.isRequired,
        description: PropTypes.string,
    }),
};

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

Überblick.propTypes = {
    tickerDetails: PropTypes.shape({
        market_cap: PropTypes.string.isRequired,
        primary_exchange: PropTypes.string.isRequired,
    }),
};

const TokenOverview = ({ tickerDetails }) => {
    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            m={4}
        >
            <SingleToken tickerDetails={tickerDetails} />
            <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
                <Überblick tickerDetails={tickerDetails} />
            </Box>
        </Flex>
    );
};

TokenOverview.propTypes = {
    tickerDetails: PropTypes.shape({
        name: PropTypes.string.isRequired,
        ticker: PropTypes.string.isRequired,
        description: PropTypes.string,
        market_cap: PropTypes.string.isRequired,
        primary_exchange: PropTypes.string.isRequired,
    }),
};

export default TokenOverview;
