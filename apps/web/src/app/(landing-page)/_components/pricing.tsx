import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@nx-ddd/ui';

type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  isPopular?: boolean;
};

export function PricingCard(props: PricingCardProps) {
  return (
    <Card
      className={`w-full max-w-sm ${
        props.isPopular ? 'border-primary border-2 shadow-lg' : ''
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{props.price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2">
          {props.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="text-primary mr-2 h-4 w-4" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={props.isPopular ? 'default' : 'outline'} asChild>
          <Link href={props.buttonHref}>{props.buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PricingGrid(props: {
  title: string;
  subtitle: string;
  items: PricingCardProps[];
}) {
  return (
    <section
      id="features"
      className="container space-y-6 py-8 md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">{props.title}</h2>
        <p className="text-muted-foreground max-w-[85%] sm:text-lg">
          {props.subtitle}
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
        {props.items.map((item, index) => (
          <PricingCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
